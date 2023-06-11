import { UnauthenticatedError } from "../Errors/index.js"

export const checkPermission = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnauthenticatedError("Not authorized to access this route")
}