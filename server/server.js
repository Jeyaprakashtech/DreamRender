import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user_router.js";
import imgRouter from "./routes/img_router.js";
import testRoutes from "./routes/test_router.js";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
await connectDB();
app.use("/api/users", userRouter);
app.use("/api/image", imgRouter);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
