import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const url = process.env_DB_URL;

export const connectToMongoose = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/expenses");

    }
    catch(error){
        console.log(error);
    }
}