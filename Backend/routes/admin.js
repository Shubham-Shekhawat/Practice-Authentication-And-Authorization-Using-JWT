import express from "express";
import {deleteUser, getUser} from "../controllers/Admin.js";
import { isAdmin } from "../middleware/varifyToken.js";
const AdminRoutes = express.Router();

AdminRoutes.get('/getuser',isAdmin,getUser)
AdminRoutes.delete('/delete/:id',isAdmin,deleteUser)



export default AdminRoutes;