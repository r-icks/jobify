import express from "express"
const app = express()

import morgan from "morgan"
if(process.env.NODE_ENV!=='PRODUCTION'){
    app.use(morgan('dev'));
}

import dotenv from "dotenv"
dotenv.config()

import "express-async-errors"

//db and authenticate user
import connectDB from "./db/connect.js";

//routers
import authRouter from "./Routes/authRoutes.js";
import jobRouter from "./Routes/jobRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

const port = process.env.PORT || 5000

app.use(express.json())  //to pass json objects

app.get("/", (req, res) => {
    res.send({msg:"Welcome"});
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobRouter)

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