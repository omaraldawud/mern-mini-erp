const generateEmployeeId = async (EmployeeModel) => {
  try {
    const latestEmployee = await EmployeeModel.findOne().sort({
      employeeId: -1,
    });

    if (!latestEmployee) {
      return "EMP-001";
    }

    const lastId = latestEmployee.employeeId;
    const lastNumber = parseInt(lastId.split("-")[1]);
    const newNumber = (lastNumber + 1).toString().padStart(3, "0");

    return `EMP-${newNumber}`;
  } catch (error) {
    console.error("Error generating employee ID:", error);
    // Fallback: generate based on timestamp
    return `EMP-${Date.now().toString().slice(-3)}`;
  }
};

const generateDepartmentId = async (DepartmentModel) => {
  try {
    const latestDept = await DepartmentModel.findOne().sort({
      departmentId: -1,
    });

    if (!latestDept) {
      return "DEPT-001";
    }

    const lastId = latestDept.departmentId;
    const lastNumber = parseInt(lastId.split("-")[1]);
    const newNumber = (lastNumber + 1).toString().padStart(3, "0");

    return `DEPT-${newNumber}`;
  } catch (error) {
    console.error("Error generating department ID:", error);
    // Fallback: generate based on timestamp
    return `DEPT-${Date.now().toString().slice(-3)}`;
  }
};

module.exports = { generateEmployeeId, generateDepartmentId };
