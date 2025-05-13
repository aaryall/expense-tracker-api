import './env.js'
import express from "express";
import userRouter from "./src/features/user/user.route.js";
import bodyParser from "body-parser";
import { connectToMongoDB } from './src/config/mongodb.js';
import expenseRoute from './src/features/expense/expense.route.js';
import jwtAuth from './src/middlewares/jwt.middleware.js'
import cookieParser from 'cookie-parser';
import { connectToMongoose } from './src/config/mongoose.config.js';



const server = express();
const PORT = 9000;
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/users',userRouter);
server.use('/expense',jwtAuth,expenseRoute);
server.listen(PORT,()=>{
    
    // connectToMongoDB();
    connectToMongoose();
    console.log(`Server is listening at port ${PORT} and database connected successfully.`);
});