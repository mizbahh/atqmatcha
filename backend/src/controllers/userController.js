import user from "../models/user.js"

export async function getAllUsers(_, res)
{
    try {
        const users = await user.find()
        res.status(200).json(users)
    } catch (error) {
        console.error("Error in getAllUsers controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getUserByID(req, res)
{
    try {
        const selectedUser = await user.findById(req.params.id)
        if(!selectedUser)
            return res.status(404).json({message: "User Not Found"})
        res.status(200).json(selectedUser)
    } catch (error) {
        console.error("Error in getUserByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createUser(req, res)
{
   try {
    const {username, password, email} = req.body
    const newUser = new user({username: username, password: password, email: email })
    
    const savedUser = await newUser.save()

    res.status(201).json(savedUser)

    console.log("User Created Succesfully");

   } catch (error) {
        console.error("Error in createUser controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateUser(req, res)
{
    try {
        const {username, password, email} = req.body
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            {username, password, email},
            {new: true,}
        )

        console.log("User Updated Succesfully");

        if(!updatedUser) //if theres no user  to update, spit out 404 error
            return res.status(404).json({message: "User Not Found"})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error in updateUser controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "User  updated successfully!"})
}

export async function makeAdmin(req, res){
    try{
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            {role: "admin"},
            {new: true}
        );

        if(!updatedUser){
            return res.status(404).json({message:"User Not Found"});
        }

        res.status(200).json({success: true, updatedUser});

    }catch(err){
        res.status(500).json({message: "Error Updating User to Admin"});
    }
}

export async function deleteUser(req, res)
{
    
    try {
        const selectedUser = await user.findByIdAndDelete(req.params.id)

        if(!selectedUser) //if theres no user  to delete, spit out 404 error
            return res.status(404).json({message: "User Not Found"})

        res.status(200).json({message: "User Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteUser controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "User  deleted successfully!"})
}