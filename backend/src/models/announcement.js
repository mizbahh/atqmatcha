import mongoose from "mongoose";


//1 - Create a schema

//2 - Create model based from the schema


const announcementSchema = new mongoose.Schema(
{
    title: { //Title of Announcement
        type:String, 
        required: true
    },
    description: { //Description of the Announcement
        type:String,
        required:true
    }

},
{
    timestamps:
    {
        createdAt: 'createdOn', //When the announcement item was created
        updatedAt: 'lastModified' //last time the announcement was updated
    }
}
);

const announcement = mongoose.model("announcement", announcementSchema);

export default announcement
