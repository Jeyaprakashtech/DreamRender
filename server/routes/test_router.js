// routes/test_routes.js
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/test-upload", async (req, res) => {
  try {
    const testImage = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";

    console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("Secret:", process.env.CLOUDINARY_API_SECRET);
    console.log("Key:", process.env.CLOUDINARY_API_KEY);

    const upload = await cloudinary.uploader.upload(testImage, {
      folder: "dreamrender/test"
    });

    return res.json({
      success: true,
      message: "Upload successful",
      url: upload.secure_url
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
});

export default router;