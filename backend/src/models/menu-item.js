import mongoose from "mongoose";

const menuitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const menuItem = mongoose.model("menuItem", menuitemSchema);

export default menuItem;