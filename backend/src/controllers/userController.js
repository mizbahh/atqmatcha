export function getAllUsers(req, res)
{
    res.status(200).send("You fetched the Users") //200 = success
}

export function createUser(req, res)
{
   res.status(201).json({message: "User created successfully!"})
}

export function updateUser(req, res)
{
    res.status(200).json({message: "User updated successfully!"})
}

export function deleteUser(req, res)
{
    res.status(200).json({message: "User deleted successfully!"})
}