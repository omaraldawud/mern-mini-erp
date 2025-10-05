const express = require("express");
const router = express.Router();
const Employee = require("../../models/core/Employee");
const { generateEmployeeId } = require("../../utils/generateId");

// GET all employees with optional filtering
router.get("/", async (req, res) => {
  try {
    const { department, status, page = 1, limit = 100 } = req.query;

    let filter = {};
    if (department) filter["employmentInfo.department"] = department;
    if (status) filter["employmentInfo.status"] = status;

    const employees = await Employee.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "systemFields.createdAt": -1 });

    const total = await Employee.countDocuments(filter);

    res.json({
      success: true,
      count: employees.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      data: employee,
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
    const employeeId = await generateEmployeeId(Employee);

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
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Employee email already exists",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Employee email already exists",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE employee (soft delete - update status to terminated)
router.delete("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { "employmentInfo.status": "terminated" },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee terminated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// HARD DELETE employee (completely remove from database)
router.delete("/:id/hard", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      employeeId: req.params.id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee permanently deleted",
      data: deletedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET employees by department
router.get("/department/:department", async (req, res) => {
  try {
    const employees = await Employee.find({
      "employmentInfo.department": req.params.department,
    });

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

module.exports = router;
