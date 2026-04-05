import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const userSchema = new mongoose.Schema(
{
    username:{ //Username of the user
        type: String,
        required: true
    },
    password:{ //Hashed password of the user
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true
    },
    role:{ //Role of the user
        type: String,
        enum:["user", "admin"],
        default:"user"
    }
}
);

const user = mongoose.model("user", userSchema);

export default user
