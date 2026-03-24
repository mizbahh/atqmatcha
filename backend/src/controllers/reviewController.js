export function getAllReviews(req, res)
{
    res.status(200).send("You fetched the Reviews") //200 = success
}

export function createReview(req, res)
{
   res.status(201).json({message: "Review created successfully!"})
}

export function updateReview(req, res)
{
    res.status(200).json({message: "Review updated successfully!"})
}

export function deleteReview(req, res)
{
    res.status(201).json({message: "Review deleted successfully!"})
}