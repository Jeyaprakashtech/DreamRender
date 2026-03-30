import express from "express";
import { generateImage, getUserImage } from "../controller/imagecontroller.js";
import userAuth from "../middleware/auth.js";

const imgRouter = express.Router();

imgRouter.post("/generate-image", userAuth, generateImage);
imgRouter.get("/user-image", userAuth, getUserImage);
export default imgRouter;
