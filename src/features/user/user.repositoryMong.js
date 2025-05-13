import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

//Create model from Schema = collection
const UserModel = mongoose.model('users',userSchema);

export default class UserRepositoryMongoose{
    async newSignup(user){
        try {
            const newuser = new UserModel(user);
            await newuser.save();
            
        } catch (error) {
            console.log(error);
            
        }
    
    }

    async userSignin(user){
        try {
            return await UserModel.findOne({email, password})
            
        } catch (error) {
            console.log(error);
            
        }
    }

     async findByEmail(email){
            try {
               
                return await UserModel.findOne({email});
               
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
}