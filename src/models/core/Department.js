const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    enum: [
      "Engineering",
      "Human Resources",
      "Sales",
      "Marketing",
      "Finance",
      "Operations",
    ],
  },
  description: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  budget: Number,
  employeeCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  systemFields: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

// Update timestamp before saving
departmentSchema.pre("save", function (next) {
  this.systemFields.updatedAt = Date.now();
  next();
});

// ✅ CRITICAL: This must be at the end
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department; // ✅ Export the model, not the schema
