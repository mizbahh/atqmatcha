import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const reviewSchema = new mongoose.Schema(
{
    title: { //Title of review
        type:String, 
        required: true
    },
    content: { //Content of the review
        type:String,
        required:true
    },
    rating:{ //"star" rating, can be 0 through 5
        type:Number,
        required: true,
        default:0,
        min: 0,
        max: 5
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"


    }

},
{
    timestamps:
    {
        createdAt: 'createdOn', //When the review item was created
        updatedAt: 'lastModified' //last time the review was updated
    }
}
);

const review = mongoose.model("review", reviewSchema);

export default review
