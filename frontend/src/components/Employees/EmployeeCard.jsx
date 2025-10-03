import React from "react";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="card erp-card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="card-title mb-1">
              {employee.personalInfo.firstName} {employee.personalInfo.lastName}
            </h6>
            <span className="badge bg-secondary">{employee.employeeId}</span>
          </div>
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
        </div>

        <div className="mb-3">
          <p className="mb-1">
            <i className="bi bi-envelope me-2 text-muted"></i>
            {employee.personalInfo.email}
          </p>
          <p className="mb-1">
            <i className="bi bi-building me-2 text-muted"></i>
            {employee.employmentInfo.department}
          </p>
          <p className="mb-0">
            <i className="bi bi-briefcase me-2 text-muted"></i>
            {employee.employmentInfo.position}
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Salary: ${employee.employmentInfo.salary?.toLocaleString()}
          </small>
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
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
