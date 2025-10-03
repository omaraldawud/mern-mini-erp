import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
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
                        {employee.employeeId}
                      </span>
                    </td>
                    <td>
                      {employee.personalInfo.firstName}{" "}
                      {employee.personalInfo.lastName}
                    </td>
                    <td>{employee.personalInfo.email}</td>
                    <td>
                      <span className="badge bg-info">
                        {employee.employmentInfo.department}
                      </span>
                    </td>
                    <td>{employee.employmentInfo.position}</td>
                    <td>
                      <span
                        className={`badge ${
                          employee.employmentInfo.status === "active"
                            ? "bg-success"
                            : employee.employmentInfo.status === "on-leave"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {employee.employmentInfo.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(employee)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(employee._id)}
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
