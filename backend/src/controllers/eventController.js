import event from "../models/event.js"

export async function getAllEvents(_, res)
{
    try {
        const events = await event.find()
        res.status(200).json(events)
    } catch (error) {
        console.error("Error in getAllEvents controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getEventByID(req, res)
{
    try {
        const selectedEvent = await event.findById(req.params.id)
        if(!selectedEvent)
            return res.status(404).json({message: "Event Not Found"})
        res.status(200).json(selectedEvent)
    } catch (error) {
        console.error("Error in getEventByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createEvent(req, res)
{
   try {
    const {name, email, phoneNum, eventType, expectedGuests, preferredDate, eventLocation, additionalNotes, howHeardAbout} = req.body
    const newEvent = new event({name:name, email:email, phoneNum:phoneNum, eventType:eventType, expectedGuests:expectedGuests, preferredDate:preferredDate, eventLocation:eventLocation, additionalNotes:additionalNotes, howHeardAbout:howHeardAbout })
    
    const savedEvent = await newEvent.save()

    res.status(201).json(savedEvent)

    console.log("Event Created Succesfully");

   } catch (error) {
        console.error("Error in createEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateEvent(req, res)
{
    try {
        const {name, email, phoneNum, eventType, expectedGuests, preferredDate, eventLocation, additionalNotes, howHeardAbout} = req.body
        const updatedEvent = await event.findByIdAndUpdate(
            req.params.id,
            {name, email, phoneNum, eventType, expectedGuests, preferredDate, eventLocation, additionalNotes, howHeardAbout},
            {new: true,}
        )

        console.log("Event Updated Succesfully");

        if(!updatedEvent) //if theres no event  to update, spit out 404 error
            return res.status(404).json({message: "Event Not Found"})

        res.status(200).json(updatedEvent)
    } catch (error) {
        console.error("Error in updateEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Event  updated successfully!"})
}

export async function deleteEvent(req, res)
{
    
    try {
        const selectedEvent = await event.findByIdAndDelete(req.params.id)

        if(!selectedEvent) //if theres no event  to delete, spit out 404 error
            return res.status(404).json({message: "Event Not Found"})

        res.status(200).json({message: "Event Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteEvent controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Event  deleted successfully!"})
}