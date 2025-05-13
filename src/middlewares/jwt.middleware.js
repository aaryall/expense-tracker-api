import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    const token = req.cookies.token;
    //2. if no token return the error
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    //3.Check if token is valid or not
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = payload.userID;
    }
    catch(err){
        return res.status(401).send('UnauthorizeD');
    }
    //5.call next middleware
    next();  
}

export default jwtAuth;