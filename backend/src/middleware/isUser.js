import jwt from "jsonwebtoken";
import review from "../models/review.js";

export async function isReviewOwner(req, res, next){
 
    try{
        const selectedReview = await review.findById(req.params.id)

        if(!selectedReview){
            return res.status(404).json({mesage:"Review Not Found"});
        }

        //compare review owner with logged-in user
        if( req.user.role !== "admin" &&
            selectedReview.customerId?.toString() !== req.user.id
        ) {
            return res.status(403).json({message: "Not Authorized"});
        }

        //Attach review to request so controller can reuse it
        req.review = selectedReview;

        next();


    } catch(err){
        res.status(500).json({error: err.message});
    }

}