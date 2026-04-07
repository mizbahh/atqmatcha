import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menuItem",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    option: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema(
{
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    customerUsername: {
        type: String,
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    }
},
{
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "lastModified"
    }
}
);

const order = mongoose.model("order", orderSchema);

export default order;