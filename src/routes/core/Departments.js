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

// DELETE department - accepts both _id and departmentId
router.delete("/:id", async (req, res) => {
  try {
    console.log("🔄 DELETE request for:", req.params.id);

    let query;

    // Check if it's a MongoDB ObjectId (24 character hex string)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: req.params.id };
      console.log("🔍 Using _id query");
    } else {
      query = { departmentId: req.params.id };
      console.log("🔍 Using departmentId query");
    }

    // Check if department has employees
    const department = await Department.findOne(query);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const employeeCount = await Employee.countDocuments({
      "employmentInfo.department": department.name,
    });

    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete department with ${employeeCount} employees. Reassign employees first.`,
      });
    }

    const deletedDepartment = await Department.findOneAndDelete(query);

    console.log("✅ Department deleted:", deletedDepartment.name);
    res.json({
      success: true,
      message: "Department deleted successfully",
      data: deletedDepartment,
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE department
router.put("/:id", async (req, res) => {
  try {
    let query;

    // Check if it's a MongoDB ObjectId (24 character hex string)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: req.params.id };
    } else {
      query = { departmentId: req.params.id };
    }

    const updatedDepartment = await Department.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.json({
      success: true,
      data: updatedDepartment,
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

module.exports = router;
