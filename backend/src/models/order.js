import mongoose from "mongoose";
import menuItem from "./menu-item";


//1 - Create a schema

//2 - Create model based from the schema

const orderItemSchema = new mongoose.Schema( //For each item in the order
{
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu-item",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: number,
        required: true
    }
    
}
);

const orderSchema = new mongoose.Schema( //For the whole order
{
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items:[orderItemSchema],
    total:{
        type: Number,
        default: 0
    },
    status:{
        type:String,
        enum:["pending", "completed", "cancelled"],
        default: "pending"
    }

},
{
    timestamps:
    {
        createdAt: 'createdOn', //When the order item was created
        updatedAt: 'lastModified' //last time the order was updated
    }
}
);



const order = mongoose.model("order", orderSchema);

export default order
