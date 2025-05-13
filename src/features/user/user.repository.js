import { getDb } from '../../config/mongodb.js';

export class UserRepository{
    // constructor(){
    //     this.collection = "user";
    // }
    // constructor(){
    //     db = getDb();
    //     collection = db.collection("users");
    // }

    async userSignUp(newUser){
        try {
            const  db = getDb();
            const collection = db.collection("users");
            await collection.insertOne(newUser);
            return newUser;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async userSignin(email, password){
        try {
            const  db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({email, password});
            
        } catch (error) {
            console.log(error);
            throw new Error(error);
            
        }
    }
    async findByEmail(email){
        try {
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({email});
           
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}