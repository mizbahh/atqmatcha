import scheduledEvent from "../models/schedule.js"

export async function getAllScheduledEvents(_, res)
{
    try {
        const scheduledEvents = await scheduledEvent.find().sort({date: 1})
        res.status(200).json(
            scheduledEvents.map(e => ({
                ...e._doc, //accesses the attributes of the mongoDB entries
                date: `${e.date.getUTCFullYear()}-${String(e.date.getUTCMonth() + 1).padStart(2, "0")}-${String(e.date.getUTCDate()).padStart(2, "0")}`            }))
        );
    } catch (error) {
        console.error("Error in getAllScheduledEvents controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getScheduledEventByID(req, res)
{
    try {
        const selectedScheduledEvent = await scheduledEvent.findById(req.params.id)
        if(!selectedScheduledEvent)
            return res.status(404).json({message: "ScheduledEvent Not Found"})
        res.status(200).json(selectedScheduledEvent)
    } catch (error) {
        console.error("Error in getScheduledEventByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createScheduledEvent(req, res)
{
   try {
    const {name, location, date, time, type, notes} = req.body
    const newScheduledEvent = new scheduledEvent({name:name, location:location, date:new Date(date), time:time, type:type, notes:notes })
    
    const savedScheduledEvent = await newScheduledEvent.save()

    res.status(201).json(savedScheduledEvent)

    console.log("ScheduledEvent Created Succesfully");

   } catch (error) {
        console.error("Error in createScheduledEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateScheduledEvent(req, res)
{
    try {
        const {name, location, date, time, type, notes} = req.body
        const updatedScheduledEvent = await scheduledEvent.findByIdAndUpdate(
            req.params.id,
            {name, location, date: new Date(date), time, type, notes},
            {new: true,}
        )

        console.log("ScheduledEvent Updated Succesfully");

        if(!updatedScheduledEvent) //if theres no scheduledEvent  to update, spit out 404 error
            return res.status(404).json({message: "ScheduledEvent Not Found"})

        res.status(200).json(updatedScheduledEvent)
    } catch (error) {
        console.error("Error in updateScheduledEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "ScheduledEvent  updated successfully!"})
}

export async function deleteScheduledEvent(req, res)
{
    
    try {
        const selectedScheduledEvent = await scheduledEvent.findByIdAndDelete(req.params.id)

        if(!selectedScheduledEvent) //if theres no scheduledEvent  to delete, spit out 404 error
            return res.status(404).json({message: "ScheduledEvent Not Found"})

        res.status(200).json({message: "ScheduledEvent Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteScheduledEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "ScheduledEvent  deleted successfully!"})
}