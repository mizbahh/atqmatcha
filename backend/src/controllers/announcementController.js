import announcement from "../models/announcement.js"

export async function getAllAnnouncements(_, res)
{
    try {
        const announcements = await announcement.find()
        res.status(200).json(announcements)
    } catch (error) {
        console.error("Error in getAllAnnouncements controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getAnnouncementByID(req, res)
{
    try {
        const selectedAnnouncement = await announcement.findById(req.params.id)
        if(!selectedAnnouncement)
            return res.status(404).json({message: "Announcement Not Found"})
        res.status(200).json(selectedAnnouncement)
    } catch (error) {
        console.error("Error in getAnnouncementByID controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createAnnouncement(req, res)
{
   try {
    const {title, description} = req.body
    const newAnnouncement = new announcement({title: title, description: description})
    
    const savedAnnouncement = await newAnnouncement.save()

    res.status(201).json(savedAnnouncement)

    console.log("Announcement Created Succesfully");

   } catch (error) {
        console.error("Error in createAnnouncement controller", error)
        res.status(500).json({message:"Internal Server Error"})
   }
}

export async function updateAnnouncement(req, res)
{
    try {
        const {title, description} = req.body
        const updatedAnnouncement = await announcement.findByIdAndUpdate(
            req.params.id,
            {title, description},
            {new: true,}
        )

        console.log("Announcement Updated Succesfully");

        if(!updatedAnnouncement) //if theres no announcement  to update, spit out 404 error
            return res.status(404).json({message: "Announcement Not Found"})

        res.status(200).json(updatedAnnouncement)
    } catch (error) {
        console.error("Error in updateAnnouncement controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Announcement  updated successfully!"})
}

export async function deleteAnnouncement(req, res)
{
    
    try {
        const selectedAnnouncement = await announcement.findByIdAndDelete(req.params.id)

        if(!selectedAnnouncement) //if theres no announcement  to delete, spit out 404 error
            return res.status(404).json({message: "Announcement Not Found"})

        res.status(200).json({message: "Announcement Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteAnnouncement controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
    //res.status(200).json({message: "Announcement  deleted successfully!"})
}