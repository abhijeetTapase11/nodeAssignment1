import express from "express"
import dotenv from "dotenv"
import { router } from "./routes/endpints.js";
import mongoose from "mongoose";

dotenv.config();

const app=express();
app.use(express.json());

app.use(router);


const PORT=process.env.PORT||5050;

mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`connected to database and listening on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})