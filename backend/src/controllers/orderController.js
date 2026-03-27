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
    const newOrder = new order({
        customerId: req.user.id,
        items: req.body.items
    })
    
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

        if(req.user.role == "admin" || selectedOrder.customerId.toString() == req.user.id){
            const {customerID, items} = req.body
            const updatedOrder = await order.findByIdAndUpdate(
                req.params.id,
                {customerID, items},
                {new: true}
            )

            if(!updatedOrder) //if theres no order  to update, spit out 404 error
                return res.status(404).json({message: "Order Not Found"})

            console.log("Order Updated Succesfully");

            res.status(200).json(updatedOrder)
        }
        else{
            return res.status(403).json({message: "Not Authorized - User Cannot Update Other's Orders"})
        }
        
    } catch (error) {
        console.error("Error in updateOrder controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Order  updated successfully!"})
}

export async function deleteOrder(req, res)
{
    
    try {
            const selectedOrder = await order.findById(req.params.id)
    
            if(!selectedOrder) //if theres no order  to delete, spit out 404 error
                return res.status(404).json({message: "Order Not Found"})
    
            if(req.user.role == "admin" || selectedOrder.customerId.toString() == req.user.id){
                await selectedOrder.deleteOne()
                res.status(200).json({message: "Order Deleted Successfully"})
            }
            else{
                return res.status(403).json({message: "Not Authorized - User Cannot Delete Other's Orders"})
            }
    
            
        } catch (error) {
            console.error("Error in deleteOrder controller", error)
            res.status(500).json({message:"Internal Server Error"})
        }
    
    
    //res.status(200).json({message: "Order  deleted successfully!"})
}