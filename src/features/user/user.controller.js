import jwtAuth from '../../middlewares/jwt.middleware.js';
import {UserModel} from '../user/user.model.js'
import { UserRepository } from './user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepositoryMongoose from './user.repositoryMong.js';
export class UserController{
    constructor(){
        this.userRepository = new UserRepositoryMongoose();
    }
    
    async signup(req,res){
       const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel(name, email, hashedPassword);
        // users.push(newUser);
        await this.userRepository.newSignup(newUser);
        // {
        //     "name":"arsh Yadav",
        //     "email":"aryan@gmail.com",
        //     "password":"123"
        // }
         res.status(201).send(newUser);
    }

    //For Mongodb 
    // async signin(req,res){
    //     const {email , password} = req.body;
    //     if(email && password){
    //         const userExist = await  this.userRepository.findByEmail(email);
    //         if(!userExist){
    //             res.status(404).send("Please signup");
    //         }

    //         //compare password with hashed password
    //         const isUserPrsesnt = await bcrypt.compare(password , userExist.password);
    //         console.log('User',userExist);
    //         if(isUserPrsesnt){
    //             //Create Token
    //             const token = jwt.sign({userID: userExist._id,
    //                                     email : isUserPrsesnt.email },process.env.JWT_SECRET,
    //                                 {
    //                                     expiresIn:'1h',
    //                                 });
    //             //3. Set token in HTTP-only cookie
    //             res.cookie('token', token,{
    //                 httpOnly: true,
    //                 sameSite:'strict',
    //                 maxAge: 3600000,
    //                 path:'/'
    //             })
    //             return res.status(200).json({
    //                 success: true,
    //                 message: 'Authentication successful',
    //                 user:userExist
    //             });
    //         }
    //         else{
    //             //Password doesn't match
    //             res.status(401).send("Unauthorized User");
    //         }
    //     }
    //     else{
    //         return res.status(401).send('Please enter email and password');
    //     }
        
       
    // }
    async signin(req,res){
        const {email , password} = req.body;
            if(email && password){
                const userExist = await  this.userRepository.findByEmail(email);
                if(!userExist){
                    res.status(404).send("Please signup");
                }
    
                //compare password with hashed password
                const isUserPrsesnt = await bcrypt.compare(password , userExist.password);
                console.log('User',userExist);
                if(isUserPrsesnt){
                    //Create Token
                    const token = jwt.sign({userID: userExist._id,
                                            email : isUserPrsesnt.email },process.env.JWT_SECRET,
                                        {
                                            expiresIn:'1h',
                                        });
                    //3. Set token in HTTP-only cookie
                    res.cookie('token', token,{
                        httpOnly: true,
                        sameSite:'strict',
                        maxAge: 3600000,
                        path:'/'
                    })
                    return res.status(200).json({
                        success: true,
                        message: 'Authentication successful',
                        user:userExist
                    });
                }
                else{
                    //Password doesn't match
                    res.status(401).send("Unauthorized User");
                }
            }
            else{
                return res.status(401).send('Please enter email and password');
            }
            
    }

}