import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from "../models/transcation_model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const exitsuser = await userModel.findOne({ email });

    if (exitsuser) {
      return res.json({ message: "User already exist!.Please try to login." });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ message: "Server error: " + error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in LoginUser:", error);
    res.json({ message: "Server error: " + error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditbalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error("Error in userCredits:", error);
    res.json({ message: "Server error: " + error.message });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing userId or planId" });
    }

    let plan, credits, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 299;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 1000;
        amount = 1999;
        break;

      case "Premium":
        plan = "Premium";
        credits = 5000;
        amount = 6999;
        break;

      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    const order = await razorpayInstance.orders.create(
      options,
      (error, order) => {
        if (error) {
          res.json({ success: false, message: error.message });
        }

        res.json({ success: true, order });
      },
    );
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt,
      );

      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment already done" });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditbalance = userData.creditbalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditbalance });

      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Paymet Successfull. Credits Added" });
    } else {
      res.json({ success: false, message: "Paymet Failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { registerUser, LoginUser, userCredits, paymentRazorpay, verifyPayment };
