import jwt from "jsonwebtoken";

export default function isAdmin(req, res, next){
 
    if(String(req.user) && String(req.user.role) === "admin"){
        console.log("Admin Access Accepted");
        next();
    }
    else{
        return res.status(403).json({message:"Admin Access Denied"});
    }
}