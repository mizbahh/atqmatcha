export function getAllMenuItems(req, res)
{
    res.status(200).send("You fetched the menu") //200 = success
}

export function createMenuItem(req, res)
{
   res.status(201).json({message: "Menu item created successfully!"})
}

export function updateMenuItem(req, res)
{
    res.status(200).json({message: "Menu item updated successfully!"})
}

export function deleteMenuItem(req, res)
{
    res.status(201).json({message: "Menu item deleted successfully!"})
}