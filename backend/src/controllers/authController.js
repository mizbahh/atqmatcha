import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";


// Register Controller
export async function registerUser(req, res){

    //gets user input from the frontend form
    const { username, password } = req.body;

    try {

        //queries database to see if same username exists
        let newUser = await user.findOne({ username });
        if (newUser) {
            //returns a 404 error if match found
            return res.status(400).json({ msg: 'User already exists' });
        }

        //creates new user
        newUser = new user({ username, password });

        //uses salt to make password hash stronger & secure
        const salt = await bcrypt.genSalt();//generates a salt to hash the password with
        newUser.password = await bcrypt.hash(password, salt); //hashes password using salt

        //saves the hashed password in MongoDB
        await newUser.save();
       
        console.log("User id:", newUser._id);

        //creates token
        const payload = 
        {
            user: 
            {
                id: String(newUser._id)
            }        
        };

        //builds JSON web token, expires in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "1h"
        });

        res.status(200).json({token});
       
        

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
export async function loginUser(req, res){

    //gets the user input from the frontend
    const { username, password } = req.body;

    try {
        // Check if the user exists
        let selectedUser = await user.findOne({ username });
        if (!selectedUser) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Validate password by comparing plain text password from front with hashed password in DB
        const isMatch = await bcrypt.compare(password, selectedUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

          //creates token
        const payload = {
            user: 
            {
                id: String(selectedUser.id)
            }
        };

        //builds JSON web token, expires in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "1h"
        });

        res.status(200).json({token});
      
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};