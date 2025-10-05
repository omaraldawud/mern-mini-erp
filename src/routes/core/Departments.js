const express = require("express");
const router = express.Router();
const Department = require("../../models/core/Department");
const Employee = require("../../models/core/Employee");

// GET all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();

    res.json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE new department - simple version
router.post("/", async (req, res) => {
  try {
    // Simple ID generation
    const departmentCount = await Department.countDocuments();
    const departmentId = `DEPT-${(departmentCount + 1)
      .toString()
      .padStart(3, "0")}`;

    const departmentData = {
      departmentId,
      ...req.body,
    };

    const department = new Department(departmentData);
    const savedDepartment = await department.save();

    res.status(201).json({
      success: true,
      data: savedDepartment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Department name already exists",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findOne({
      departmentId: req.params.id,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
