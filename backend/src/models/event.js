import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const eventSchema = new mongoose.Schema(
{
    name: {  //full name 
        type:String,
        required: true, 
        
    },
    email:{ //email
        type: String,
        required: true
    },
    phoneNum:{ //Phone Number
        type: String,
    },
    eventType:{ //Event Type
        type: String,
        required: true
    },
    expectedGuests:{ //Range of Expected # of Guests
        type: String,
    },
    preferredDate:{ //Preferred Date of Event
        type:String,
        required: true
    },
    eventLocation:{ //Event Location / Venue
        type: String
    },
    additionalNotes:{ //Additional info : themes, special requests, accessibility
        type:String
    },
    howHeardAbout:{ //How Did You Hear About Us?
        type:String
    },
    customerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},
);

const event = mongoose.model("event", eventSchema);

export default event
