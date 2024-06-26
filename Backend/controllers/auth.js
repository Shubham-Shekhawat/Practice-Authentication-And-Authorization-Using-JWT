import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const register =async (req,res)=>{
    try {
        let {name,email,role,password} = req.body;
        const user = await userModel.findOne({email});
        if(user) {
            return res.status(400).json({success:false,message:"User Already Exists"})
        }

        const hashedPassword = bcrypt.hashSync(password,10);

        const newUser = await userModel.create({
            name,
            email,
            role,
            password:hashedPassword});
        return res.status(200).json({success:true,message:"User Created Successfully",newUser})
    } catch (error) {
        res.send(error)
    }
}


const login =async (req,res)=>{
    try {
        let {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(user) {
            const correctPassword = bcrypt.compareSync(password,user.password) ;
            if(correctPassword){
                const token = jwt.sign({userId:user._id},process.env.Jwt_Secret)
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:false,
                    maxAge:3600000
                })

                return res.status(200).json({success:true,message:"User SignedIn Successfully",user,token})
            }
            else{
                return res.status(401).json({success:false,message:"Incorrect Password"})
            }
            
        }

        return res.status(200).json({success:false,message:"User Doesn't Exists"})
    } catch (error) {
        res.send(error)
    }
}
const logout =async (req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(401).json({success:true,message:"User SignedOut Successfully"})
    } catch (error) {
        res.send(error)
    }
}

export  {register,login,logout}