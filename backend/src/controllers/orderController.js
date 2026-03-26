import order from "../models/order.js"

export async function getAllOrders(_, res)
{
    try {
        const orders = await order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error("Error in getAllOrders controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getOrderByID(req, res)
{
    try {
        const selectedOrder = await order.findById(req.params.id)
        if(!selectedOrder)
            return res.status(404).json({message: "Order Not Found"})
        res.status(200).json(selectedOrder)
    } catch (error) {
        console.error("Error in getOrderByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createOrder(req, res)
{
   try {
    const {customerID, items} = req.body
    const newOrder = new order({title: title, content: content, rating: rating, customerId: customerId})
    
    const savedOrder = await newOrder.save()

    res.status(201).json(savedOrder)

    console.log("Order Created Succesfully");

   } catch (error) {
        console.error("Error in createOrder controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateOrder(req, res)
{
    try {
        const {customerID, items} = req.body
        const updatedOrder = await order.findByIdAndUpdate(
            req.params.id,
            {customerID, items},
            {new: true}
        )

        console.log("Order Updated Succesfully");

        if(!updatedOrder) //if theres no order  to update, spit out 404 error
            return res.status(404).json({message: "Order Not Found"})

        res.status(200).json(updatedOrder)
    } catch (error) {
        console.error("Error in updateOrder controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Order  updated successfully!"})
}

export async function deleteOrder(req, res)
{
    
    try {
        const selectedOrder = await order.findByIdAndDelete(req.params.id)

        if(!selectedOrder) //if theres no order  to delete, spit out 404 error
            return res.status(404).json({message: "Order Not Found"})

        res.status(200).json({message: "Order Deleted Successfully"})
    } catch (error) {
        console.error("Error in updateOrder controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Order  deleted successfully!"})
}