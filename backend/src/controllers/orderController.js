export function getAllOrders(req, res)
{
    res.status(200).send("You fetched the Orders") //200 = success
}

export function createOrder(req, res)
{
   res.status(201).json({message: "Order created successfully!"})
}

export function updateOrder(req, res)
{
    res.status(200).json({message: "Order updated successfully!"})
}

export function deleteOrder(req, res)
{
    res.status(200).json({message: "Order deleted successfully!"})
}