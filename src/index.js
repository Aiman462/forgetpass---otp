import express from "express";
import bodyParser from "body-parser";
import dotenv  from "dotenv";
import route from "./routes/userRoute.js";
import mongoose from "mongoose";

const app= express();
dotenv.config();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

const connection= mongoose.connection;
connection.once( "connected" ,()=> console.log("database connected"));
connection.on( "error",(error)=> console.log("database not connected"));


app.use("/user", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});