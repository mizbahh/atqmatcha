import review from "../models/review.js"

export async function getAllReviews(_, res)
{
    try {
        const reviews = await review.find()
        res.status(200).json(reviews)
    } catch (error) {
        console.error("Error in getAllReviews controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getReviewByID(req, res)
{
    try {
        const selectedReview = await review.findById(req.params.id)
        if(!selectedReview)
            return res.status(404).json({message: "Review Not Found"})
        res.status(200).json(selectedReview)
    } catch (error) {
        console.error("Error in getReviewByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createReview(req, res)
{
   try {
    const {title, content, rating} = req.body

    if(!req.user)
        return res.status(403).json({message:"Missing Login"})

    const newReview = new review({
        title: title, 
        content: content, 
        rating: rating, 
        customerId: req.user.id
    })
    
    const savedReview = await newReview.save()

    res.status(201).json(savedReview)

    console.log("Review Created Succesfully");

   } catch (error) {
        console.error("Error in createReview controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateReview(req, res)
{
    try {

        const reviewToUpdate = await review.findById(req.params.id);

        if(!reviewToUpdate)
            return res.status(404).json({message:"Review Not Found"});

         if(req.user.role == "admin" || reviewToUpdate.customerId.toString() == req.user.id){
            const {title, content, rating} = req.body;

            const updatedReview = await review.findByIdAndUpdate(
                req.params.id,
                {title, content, rating},
                {new: true,}
            )

            res.status(200).json(updatedReview)

            console.log("Review Updated Succesfully");
         }
        else{
            return res.status(403).json({message: "Not Authorized - User Cannot Delete Other's Reviews"})
        }
       

    } catch (error) {
        console.error("Error in updateReview controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Review  updated successfully!"})
}

export async function deleteReview(req, res)
{
    
    try {
        const selectedReview = await review.findById(req.params.id)

        if(!selectedReview) //if theres no review  to delete, spit out 404 error
            return res.status(404).json({message: "Review Not Found"})

        if(req.user.role == "admin" || selectedReview.customerId.toString() == req.user.id){
            await selectedReview.deleteOne()
            res.status(200).json({message: "Review Deleted Successfully"})
        }
        else{
            return res.status(403).json({message: "Not Authorized - User Cannot Delete Other's Reviews"})
        }

        
    } catch (error) {
        console.error("Error in deleteReview controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Review  deleted successfully!"})
}