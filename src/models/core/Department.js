const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentId: { type: String, unique: true, required: true },
    name: { type: String, required: true, unique: true },
    description: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    budget: Number,
    headcountBudget: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
