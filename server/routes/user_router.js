import express from "express";
import {
  registerUser,
  LoginUser,
  userCredits,
  paymentRazorpay,
  verifyPayment,
} from "../controller/usercontroller.js";
import userAuth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", LoginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/payment", userAuth, paymentRazorpay);
userRouter.post("/verify-payment", verifyPayment);

export default userRouter;
