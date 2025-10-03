const express = require("express");
const router = express.Router();
const Employee = require("../../models/core/Employee");

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE new employee
router.post("/", async (req, res) => {
  try {
    // Generate simple employee ID for now
    const employeeCount = await Employee.countDocuments();
    const employeeId = `EMP-${(employeeCount + 1).toString().padStart(3, "0")}`;

    const employeeData = {
      employeeId,
      ...req.body,
    };

    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    res.status(201).json({
      success: true,
      data: savedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
