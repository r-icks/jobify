import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcryptjs";
import  jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please provide the Name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String, 
        required: [true, "Please provide the Email"],
        validate:{
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true,
    },
    password: {
        type: String, 
        required: [true, "Please provide the Password"],
        minlength: 6, 
        select: false,
    },
    lastName: {
        type: String, 
        maxlength: 20,
        default: "Last Name",
        trim: true
    },
    location: {
        type: String, 
        maxlength: 20,
        default: "My city",
        trim: true
    },
})

UserSchema.pre("save", async function(){
    if(!this.isModified('password')) return;
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bycrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model("User", UserSchema)