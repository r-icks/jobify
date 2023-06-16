import { UnauthenticatedError } from "../Errors/index.js"
import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        throw new UnauthenticatedError("Authentication Invalid") 
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '648bf32c36e37d90815d0fbd'
        req.user = {userId: payload.userId, testUser}
        next()
    }
    catch(err){
        throw new UnauthenticatedError("Authentication Invalid")
    }
}

export default auth