import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const menuitemSchema = new mongoose.Schema(
{
    name: {
        type:String, 
        required: true
    },
    description: {
        type:String,
        required:true
    },
    imageURL:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true,
        min: 0
    }

}
);

const menuItem = mongoose.model("menuItem", menuitemSchema);

export default menuItem
