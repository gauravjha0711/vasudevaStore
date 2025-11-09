const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

//MongoDB Connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/vashudevstore";

// Connect to MongoDB
main()
  .then(() => {
    console.log(`✅ Connected to database`);
  })
  .catch((err) => {
    console.log(`❌ Error connecting to database: ${err}`);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const userModel = require("./src/Components/userModel");

const app = express();

//CORS setup
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

//Testing
app.get("/helloAll", (req, res) => {
  res.send("Hello How are you");
  console.log("Hello How are you");
});

//LOGIN ROUTE 
app.post("/userInfocheckUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("❌ Email not found");
      return res.status(404).json({ message: "User not found" });
    }

    //Compare entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("✅ User login successful");
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("⚠️ Error during login:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// SIGNUP ROUTE 
app.post("/userInfo/users", async (req, res) => {
  try {
    const { name, email, phone, location, pin, address, houseNo, password } =
      req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      phone,
      location,
      pin,
      address,
      houseNo,
      password: hashedPassword, // Store hashed password
    });

    console.log("🆕 New user data received:", req.body);

    await newUser.save();
    console.log(`✅ New User added: ${newUser.email}`);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("⚠️ Error while saving user:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is Working Fine!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
