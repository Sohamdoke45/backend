import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/school";
const username = "Soham";
const password = "1234";

export default async function handler(req, res) {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const existing = await User.findOne({ username });
  if (!existing) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Admin created successfully" });
  } else {
    res.status(200).json({ message: "Admin already exists" });
  }
  await mongoose.disconnect();
}
