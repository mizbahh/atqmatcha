import menuItem from "../models/menu-item.js";

function buildMenuItemPayload(body) {
    const {
        name,
        description,
        imageURL = "",
        price,
        category = "hot",
        tag = "",
        color = "",
        options = [],
        displayOrder = 0
    } = body;

    return {
        name,
        description,
        imageURL,
        price,
        category,
        tag,
        color,
        options,
        displayOrder
    };
}

export async function getAllMenuItems(_, res)
{
    try {
        const menuItems = await menuItem.find().sort({ displayOrder: 1, name: 1 });
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error in getAllMenuItems controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getMenuItemByID(req, res)
{
    try {
        const selectedMenuItem = await menuItem.findById(req.params.id);
        if(!selectedMenuItem)
            return res.status(404).json({message: "Menu Item Not Found"});
        res.status(200).json(selectedMenuItem);
    } catch (error) {
        console.error("Error in getMenuItemByID controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


export async function createMenuItem(req, res)
{
   try {
    const newMenuItem = new menuItem(buildMenuItemPayload(req.body));
    
    const savedItem = await newMenuItem.save();

    res.status(201).json(savedItem);

    console.log("Menu Item Created Succesfully");

   } catch (error) {
        console.error("Error in createMenuItem controller", error);
        res.status(500).json({message:"Internal Server Error"});
   }
}

export async function updateMenuItem(req, res)
{
    try {
        const updatedMenuItem = await menuItem.findByIdAndUpdate(
            req.params.id,
            buildMenuItemPayload(req.body),
            {new: true, runValidators: true}
        );

        if(!updatedMenuItem)
            return res.status(404).json({message: "Menu Item Not Found"});

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        console.error("Error in updateMenuItem controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteMenuItem(req, res)
{
    
    try {
        const selectedMenuItem = await menuItem.findByIdAndDelete(req.params.id);

        if(!selectedMenuItem)
            return res.status(404).json({message: "Menu Item Not Found"});

        res.status(200).json({message: "Menu Item Deleted Successfully"});
    } catch (error) {
        console.error("Error in deleteMenuItem controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}