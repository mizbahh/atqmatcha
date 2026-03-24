import menuItem from "../models/menu-item.js"
export async function getAllMenuItems(req, res)
{
    try {
        const menuItems = await menuItem.find()
        res.status(200).json(menuItems)
    } catch (error) {
        console.error("Error in getAllMenuItems controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createMenuItem(req, res)
{
   try {
    const {name, description, imageURL, price} = req.body
    const newMenuItem = new menuItem({name:name, description:description, imageURL:imageURL, price:price})
    
    const savedItem = await newMenuItem.save()

    res.status(201).json(savedItem)

    console.log("Menu Item Created Succesfully");

   } catch (error) {
        console.error("Error in createMenuItem controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export function updateMenuItem(req, res)
{
    res.status(200).json({message: "Menu item updated successfully!"})
}

export function deleteMenuItem(req, res)
{
    res.status(200).json({message: "Menu item deleted successfully!"})
}