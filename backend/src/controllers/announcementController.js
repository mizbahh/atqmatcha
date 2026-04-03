import announcement from "../models/announcement.js";

export async function getAllAnnouncements(_, res) {
  try {
    const announcements = await announcement.find().sort({ createdOn: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error in getAllAnnouncements controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAnnouncementByID(req, res) {
  try {
    const selectedAnnouncement = await announcement.findById(req.params.id);

    if (!selectedAnnouncement) {
      return res.status(404).json({ message: "Announcement Not Found" });
    }

    res.status(200).json(selectedAnnouncement);
  } catch (error) {
    console.error("Error in getAnnouncementByID controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createAnnouncement(req, res) {
  try {
    const {
      title,
      tag,
      excerpt,
      body,
      featured,
      readTime
    } = req.body;

    if (!title || !tag || !excerpt || !body) {
      return res.status(400).json({ message: "Title, tag, excerpt, and body are required." });
    }

    if (featured) {
      await announcement.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const newAnnouncement = new announcement({
      title,
      tag,
      excerpt,
      body,
      featured: featured ?? false,
      readTime: readTime || "1 min"
    });

    const savedAnnouncement = await newAnnouncement.save();

    console.log("Announcement created successfully");
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error("Error in createAnnouncement controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAnnouncement(req, res) {
  try {
    const {
      title,
      tag,
      excerpt,
      body,
      featured,
      readTime
    } = req.body;

    if (featured) {
      await announcement.updateMany(
        { _id: { $ne: req.params.id }, featured: true },
        { $set: { featured: false } }
      );
    }

    const updatedAnnouncement = await announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        tag,
        excerpt,
        body,
        featured,
        readTime
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement Not Found" });
    }

    console.log("Announcement updated successfully");
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error("Error in updateAnnouncement controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteAnnouncement(req, res) {
  try {
    const selectedAnnouncement = await announcement.findByIdAndDelete(req.params.id);

    if (!selectedAnnouncement) {
      return res.status(404).json({ message: "Announcement Not Found" });
    }

    res.status(200).json({ message: "Announcement Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteAnnouncement controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}