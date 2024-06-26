import userModel from "../models/user.js";

const getUser = async (req,res)=>{
    try {
        
        const users =await userModel.find();
        // console.log(users)
        return res.status(200).json({users:users})
    } catch (error) {
        return res.status(404).json(error)
    }
}
const deleteUser =async (req,res)=>{
    try {
        let id = req.params.id;
        const userToBeDeleted = await userModel.findById({_id:id}) 
        if(!userToBeDeleted){
            return res.status(400).json({message:"User to be deleted Not Found" 
        })}
        if(userToBeDeleted.role === 'admin'){
            return res.status(400).json({message:"You Can't Delete An Admin. First Change The Role"})
        }
        const user_Deleted = await userModel.findByIdAndDelete({_id:id}) 
        return res.status(200).json({message:"User Deleted Successfully",user_Deleted:user_Deleted})
    } catch (error) {
        return res.status(400).json({message:"Server Error",error:error})
    }
}

export  {getUser,deleteUser}