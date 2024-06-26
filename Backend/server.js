import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DataBaseConnected from './utils/db.js'
import cookieParser from 'cookie-parser'
import AuthRoutes from './routes/auth.js'
import AdminRoutes from './routes/admin.js'

dotenv.config() 
const Port=process.env.PORT || 3000

const app=express()

DataBaseConnected()
 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth',AuthRoutes)
app.use('/api/admin',AdminRoutes)


app.get('/',(req,res)=>{
    res.send("HOME")
})

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
})