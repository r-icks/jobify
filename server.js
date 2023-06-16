import express from "express"
const app = express()

import morgan from "morgan"
if(process.env.NODE_ENV!=='PRODUCTION'){
    app.use(morgan('dev'));
}

import dotenv from "dotenv"
dotenv.config()

import "express-async-errors"

import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from "path";

//db and authenticate user
import connectDB from "./db/connect.js";

//routers
import authRouter from "./Routes/authRoutes.js";
import jobRouter from "./Routes/jobRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname,'./client/build')))
app.use(express.json())  //to pass json objects

app.use(cookieParser())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`Listening to port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();