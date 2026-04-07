import mongoose from "mongoose";

const menuitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageURL: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        default: "hot",
        trim: true
    },
    tag: {
        type: String,
        default: "",
        trim: true
    },
    color: {
        type: String,
        default: "",
        trim: true
    },
    options: {
        type: [String],
        default: []
    },
    displayOrder: {
        type: Number,
        default: 0
    }
});

const menuItem = mongoose.model("menuItem", menuitemSchema);

export default menuItem;