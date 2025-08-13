import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: String, unique: true, required: true, trim: true },
  name: { type: String, required: false, trim: true }, // for frontend compatibility
  fullName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true, trim: true },
  address: { type: String, required: true, trim: true },
  contactNumber: { 
    type: String, 
    required: true, 
    match: [/^[0-9]{10}$/, "Invalid phone number"],
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    match: [/.+\@.+\..+/, "Invalid email address"],
    trim: true,
    lowercase: true
  },
  course: { type: String, required: true, trim: true },
  admissionDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model("Student", studentSchema);
