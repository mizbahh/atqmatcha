import order from "../models/order.js"
import menuItem from "../models/menu-item.js"

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

        if(req.user.role == "admin" || selectedOrder.customerID.toString() == req.user.id){
            res.status(200).json(selectedOrder)
        }
        else{
            return res.status(403).json({message: "Not Authorized - User Cannot Get Other's Orders"})
        }

    } catch (error) {
        console.error("Error in getOrderByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createOrder(req, res)
{
   try {

    const requestedItems = req.body.items;

    //fetch all menu items listed in the requestedItems
    const menuItemIds = requestedItems.map(i => i.menuItemId);

    //
    const menuItems = await menuItem.find({
        /*$in operator selects documents where the value of _id field 
        matches any value in the provided array 'menuItemIds'
        */
        _id: {$in: menuItemIds} 
    })

    //map items to their id, then returns a JSON-formatted output that has the id, quantity, and price listed on the item
    const items = requestedItems.map(item=> {
        //converts the menuItem's id into items.menuItemId field
        const menu = menuItems.find(
            m => m._id.equals(item.menuItemId) //m = each individual menu Item object in the array 'menuItems'
        );
    
        if (!menu){
            throw new Error('Invalid Item Id: ${item.menuItemId}');
        }

        return{
            menuItemId: menu._id,
            quantity: item.quantity,
            price: menu.price
        };

    });

    //calculate total
    const total = items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
    );

    const newOrder = await order.create({
        customerID: req.user.id,
        items,
        total
    });

    res.status(201).json(newOrder)

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