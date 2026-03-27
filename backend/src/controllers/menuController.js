import menuItem from "../models/menu-item.js"

export async function getAllMenuItems(_, res)
{
    try {
        const menuItems = await menuItem.find()
        res.status(200).json(menuItems)
    } catch (error) {
        console.error("Error in getAllMenuItems controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getMenuItemByID(req, res)
{
    try {
        const selectedMenuItem = await menuItem.findById(req.params.id)
        if(!selectedMenuItem)
            return res.status(404).json({message: "Menu Item Not Found"})
        res.status(200).json(selectedMenuItem)
    } catch (error) {
        console.error("Error in getMenuItemByID controller", error)
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

export async function updateMenuItem(req, res)
{
    try {
        const {name, description, imageURL, price} = req.body
        const updatedMenuItem = await menuItem.findByIdAndUpdate(
            req.params.id,
            {name, description, imageURL, price},
            {new: true,}
        )

        if(!updatedMenuItem) //if theres no menu item to update, spit out 404 error
            return res.status(404).json({message: "Menu Item Not Found"})

        res.status(200).json(updatedMenuItem)
    } catch (error) {
        console.error("Error in updateMenuItem controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Menu item updated successfully!"})
}

export async function deleteMenuItem(req, res)
{
    
    try {
        const selectedMenuItem = await menuItem.findByIdAndDelete(req.params.id)

        if(!selectedMenuItem) //if theres no menu item to delete, spit out 404 error
            return res.status(404).json({message: "Menu Item Not Found"})

        res.status(200).json({message: "Menu Item Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteMenuItem controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Menu item deleted successfully!"})
}