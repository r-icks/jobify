import mongoose, { mongo } from "mongoose";

const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB;