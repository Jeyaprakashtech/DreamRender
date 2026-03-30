import axios from "axios";
import userModel from "../models/user_model.js";
import imageModel from "../models/image_model.js";
import FormData from "form-data";
import cloudinary from "../config/cloudinary.js";
const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;
    console.log("User ID from token:", userId);
    console.log("Prompt received:", prompt);
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Invalid user or prompt" });
    }

    if (user.creditbalance === 0 || user.creditbalance < 0) {
      return res.json({
        success: false,
        message: "Insufficient credits balance",
        creditbalance: user.creditbalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");

    const result_img = `data:image/jpeg;base64,${base64Image}`;

    const uploadedImage = await cloudinary.uploader.upload(result_img, {
      folder: "dreamrender/users"
    });
    const date = Date.now();

    await userModel.findByIdAndUpdate(user._id, {
      creditbalance: user.creditbalance - 1,
    });

    await imageModel.create({
      userId: user._id,
      image: uploadedImage.secure_url,
      prompt: prompt,
      date: date,
    });

    return res.json({
      success: true,
      message: "Image generated successfully",
      result_img: uploadedImage.secure_url,
      creditbalance: user.creditbalance - 1,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error generating image" + error.message,
    });
  }
};

const getUserImage = async (req, res) => {
  try {
    const userId = req.userId;
    const images = await imageModel.find({ userId }).sort({ date: -1 });

    return res.json({ success: true, images });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { generateImage, getUserImage };
