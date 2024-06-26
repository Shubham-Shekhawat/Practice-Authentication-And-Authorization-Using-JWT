import mongoose from "mongoose";

const DataBaseConnected =async ()=>{
    try {
        await mongoose.connect(process.env.MongoDbURL)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

export default DataBaseConnected;