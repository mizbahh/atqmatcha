export function getAllEvents(req, res)
{
    res.status(200).send("You fetched the events") //200 = success
}

export function createEvent(req, res)
{
   res.status(201).json({message: "Event created successfully!"})
}

export function updateEvent(req, res)
{
    res.status(200).json({message: "Event updated successfully!"})
}

export function deleteEvent(req, res)
{
    res.status(201).json({message: "Event deleted successfully!"})
}