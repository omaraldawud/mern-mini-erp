const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
});

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: addressSchema,
  dateOfBirth: Date,
});

const employmentInfoSchema = new mongoose.Schema({
  department: { type: String, required: true },
  position: { type: String, required: true },
  hireDate: { type: Date, default: Date.now },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    default: "full-time",
  },
  salary: Number,
  status: {
    type: String,
    enum: ["active", "on-leave", "terminated"],
    default: "active",
  },
});

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  personalInfo: personalInfoSchema,
  employmentInfo: employmentInfoSchema,
  systemFields: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

// Update timestamp before saving
employeeSchema.pre("save", function (next) {
  this.systemFields.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
