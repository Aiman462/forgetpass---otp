import mongoose from "mongoose";

const mongoConnection= async()=>{

    await mongoose.connect(process.env.MONGO_URI);

    const connection= mongoose.connection;
    connection.once( "connected" ,()=> console.log("database connected"));
    connection.on( "error",(error)=> console.log("database not connected"));
}
export default mongoConnection;