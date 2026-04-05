import order from "../models/order.js";
import menuItem from "../models/menu-item.js";
import user from "../models/user.js";

export async function getAllOrders(_, res)
{
    try {
        const orders = await order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in getAllOrders controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderByID(req, res)
{
    try {
        const selectedOrder = await order.findById(req.params.id);

        if (!selectedOrder) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        if (req.user.role === "admin" || selectedOrder.customerID.toString() === req.user.id) {
            return res.status(200).json(selectedOrder);
        }

        return res.status(403).json({ message: "Not Authorized - User Cannot Get Other's Orders" });
    } catch (error) {
        console.error("Error in getOrderByID controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createOrder(req, res)
{
    try {
        const requestedItems = req.body.items;

        if (!requestedItems || requestedItems.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const menuItemIds = requestedItems.map((i) => i.menuItemId);

        const menuItems = await menuItem.find({
            _id: { $in: menuItemIds }
        });

        const items = requestedItems.map((item) => {
            const menu = menuItems.find(
                (m) => m._id.toString() === item.menuItemId
            );

            if (!menu) {
                throw new Error(`Invalid Item Id: ${item.menuItemId}`);
            }

            if (!item.option) {
                throw new Error(`Missing option for item: ${menu.name}`);
            }

            return {
                menuItemId: menu._id,
                quantity: item.quantity,
                price: menu.price,
                option: item.option
            };
        });

        const total = items.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        const selectedUser = await user.findById(req.user.id);

        if (!selectedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newOrder = await order.create({
            customerID: req.user.id,
            customerUsername: selectedUser.username,
            items,
            total
        });

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error in createOrder controller", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export async function updateOrder(req, res)
{
    try {
        const selectedOrder = await order.findById(req.params.id);

        if (!selectedOrder) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        if (req.user.role === "admin" || selectedOrder.customerID.toString() === req.user.id) {
            const updatedOrder = await order.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            return res.status(200).json(updatedOrder);
        }

        return res.status(403).json({ message: "Not Authorized - User Cannot Update Other's Orders" });
    } catch (error) {
        console.error("Error in updateOrder controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteOrder(req, res)
{
    try {
        const selectedOrder = await order.findById(req.params.id);

        if (!selectedOrder) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        if (req.user.role === "admin" || selectedOrder.customerID.toString() === req.user.id) {
            await selectedOrder.deleteOne();
            return res.status(200).json({ message: "Order Deleted Successfully" });
        }

        return res.status(403).json({ message: "Not Authorized - User Cannot Delete Other's Orders" });
    } catch (error) {
        console.error("Error in deleteOrder controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}