import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const scheduledEventSchema = new mongoose.Schema(
{
    name: { //name of scheduled event
        type:String,
        required: false
    },
    location:{ //Address of the scheduled event
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    type:{
        type:String,
        enum:["Market", "Special", "Festival"],
        required: true,
    },
    notes:{
        type:String
    }
    }
);

const scheduledEvent = mongoose.model("scheduledEvent", scheduledEventSchema);

export default scheduledEvent
