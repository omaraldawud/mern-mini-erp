import React from "react";

const EmployeeList = ({ employees = [], onEdit, onDelete }) => {
  // Safe function to get employee name
  const getEmployeeName = (employee) => {
    if (!employee || !employee.personalInfo) return "N/A";
    return `${employee.personalInfo.firstName || ""} ${
      employee.personalInfo.lastName || ""
    }`.trim();
  };

  const getEmployeeEmail = (employee) => {
    return employee?.personalInfo?.email || "N/A";
  };

  const getEmployeeDepartment = (employee) => {
    return employee?.employmentInfo?.department || "N/A";
  };

  const getEmployeePosition = (employee) => {
    return employee?.employmentInfo?.position || "N/A";
  };

  const getEmployeeStatus = (employee) => {
    return employee?.employmentInfo?.status || "unknown";
  };

  return (
    <div className="card erp-card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-list-ul me-2"></i>
          Employee List
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <span className="badge bg-secondary">
                        {employee.employeeId || "N/A"}
                      </span>
                    </td>
                    <td>{getEmployeeName(employee)}</td>
                    <td>{getEmployeeEmail(employee)}</td>
                    <td>
                      <span className="badge bg-info">
                        {getEmployeeDepartment(employee)}
                      </span>
                    </td>
                    <td>{getEmployeePosition(employee)}</td>
                    <td>
                      <span
                        className={`badge ${
                          getEmployeeStatus(employee) === "active"
                            ? "bg-success"
                            : getEmployeeStatus(employee) === "on-leave"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {getEmployeeStatus(employee)}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(employee)}
                          disabled={!employee}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(employee._id)}
                          disabled={!employee}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <i className="bi bi-people display-4 d-block mb-2"></i>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
