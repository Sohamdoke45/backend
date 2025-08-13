import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/school";
const username = "Soham"; // change as needed
const password = "1234"; // change as needed

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ username });
  if (existing) {
    console.log("Admin already exists");
  } else {
    await User.create({ username, password: hashedPassword });
    console.log("Admin created successfully");
  }
  mongoose.disconnect();
}

createAdmin();