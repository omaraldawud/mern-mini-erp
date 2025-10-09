require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose");
const Employee = require("../src/models/core/Employee");
const Department = require("../src/models/core/Department");
const departmentsData = require("./departmentData");
const employeesData = require("./employeesData");

// Use the EXACT same connection as server.js
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using the same method as server.js
    await connectDB();

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Employee.deleteMany({});
    await Department.deleteMany({});
    console.log("✅ Existing data cleared");

    // Create departments
    console.log("🏢 Creating departments...");
    const createdDepartments = await Department.insertMany(departmentsData);
    console.log(`✅ Created ${createdDepartments.length} departments`);

    // Create employees
    console.log("👥 Creating employees...");
    const createdEmployees = await Employee.insertMany(employeesData);
    console.log(`✅ Created ${createdEmployees.length} employees`);

    // Update department employee counts
    console.log("📊 Updating department statistics...");
    for (const dept of departmentsData) {
      const count = await Employee.countDocuments({
        "employmentInfo.department": dept.name,
      });
      await Department.findOneAndUpdate(
        { name: dept.name },
        { employeeCount: count } // Fixed: was headcountBudget, should be employeeCount
      );
      console.log(`   ${dept.name}: ${count} employees`);
    }

    // Summary
    console.log("\n🎉 Database seeded successfully!");
    console.log("📈 Summary:");
    console.log(`   Departments: ${createdDepartments.length}`);
    console.log(`   Employees: ${createdEmployees.length}`);

    const totalSalary = createdEmployees.reduce(
      (sum, emp) => sum + (emp.employmentInfo?.salary || 0),
      0
    );
    console.log(`   Total Annual Salary: $${totalSalary.toLocaleString()}`);
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("📋 Database connection closed");
    process.exit(0);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
