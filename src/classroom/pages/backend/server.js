import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1️⃣ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/smartroom", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Mongo Error", err));

// 2️⃣ Create User Schema
const userSchema = new mongoose.Schema({
  user_id: String,
  type: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// 3️⃣ API: Login
app.post("/login", async (req, res) => {
  const { user_id, password, type } = req.body;
  console.log("Login Attempt:", user_id, password, type); // 🟢 DEBUG

  try {
    const user = await User.findOne({ user_id, password, type });
     console.log("Matched User:", user); 
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({ message: "Login successful", type: user.type });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
