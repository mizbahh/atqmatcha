import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const userSchema = new mongoose.Schema(
{
    firstName: { //Title of user
        type:String,
        required: false
    },
    lastName: { //Description of the user
        type:String,
        required: false
    },
    username:{ //Address of the user
        type: String,
        required: true
    },
    password:{ //Date of the user
        type:String,
        required: true,
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default:"user"
    }
}
);

const user = mongoose.model("user", userSchema);

export default user
