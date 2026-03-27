import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const eventSchema = new mongoose.Schema(
{
    title: { //Title of Event
        type:String, 
        
    },
    description: { //Description of the Event
        type:String,
        required:true
    },
    address:{ //Address of the event
        type: String,
        required: true
    },
    date:{ //Date of the event
        type:String,
        required: true,
    },
    time:{ //Time of the event
        type:String,
        required: true
    }

},
{
    timestamps:
    {
        createdAt: 'createdOn', //When the event item was created
        updatedAt: 'lastModified' //last time the event was updated
    }
}
);

const event = mongoose.model("event", eventSchema);

export default event
