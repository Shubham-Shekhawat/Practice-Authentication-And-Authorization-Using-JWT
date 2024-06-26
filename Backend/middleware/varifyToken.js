import jwt from "jsonwebtoken";
import userModel from "../models/user.js";


const isAdmin =async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Login First"})
        } 
        
        const decoded = jwt.verify(token,process.env.Jwt_Secret)
        // const id =decoded.userId;
        const user =await userModel.findById({_id:decoded.userId})
        if(!user){
            return res.status(401).json({message:"User Not Found"})
        }
        if(user.role!=='admin'){
            return res.status(200).json({message:"Not Authorized"})
        }
        req.user=user;
        next();
    } catch (error) {
        console.error(error)
    }
}

export {isAdmin}