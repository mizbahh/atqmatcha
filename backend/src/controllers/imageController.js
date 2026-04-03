import image from "../models/image.js";

export async function getAllImages(_, res) {
  try {
    const images = await image.find().sort({ createdOn: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("Error in getAllImages controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getImageByID(req, res) {
  try {
    const selectedImage = await image.findById(req.params.id);

    if (!selectedImage) {
      return res.status(404).json({ message: "Image Not Found" });
    }

    res.status(200).json(selectedImage);
  } catch (error) {
    console.error("Error in getImageByID controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}