import { UserController } from "./user.controller.js";
import express from "express";

const userRouter = express.Router();

const usercontroller = new UserController

userRouter.post('/signup',(req,res)=>{
    usercontroller.signup(req,res);
});
userRouter.get('/signin',(req,res)=>{
    usercontroller.signin(req,res);
});


export default userRouter;