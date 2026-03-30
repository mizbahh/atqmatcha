import jwt from "jsonwebtoken";

export default function auth(req, res, next){
   
    console.log("TOKEN:", req.header("x-auth-token"));


    //gets token from request header
    const token = req.header('x-auth-token'); 

    //if there is no token for this user, authorization denied
    if(!token){
        return res.status(400).json({message:"no token, authorization denied"})
    }

    try{
        //decode the token to access user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // {id: userId}
        next();
    } catch(err){
        res.status(401).json({message:"Token is not valid"});
    }

}