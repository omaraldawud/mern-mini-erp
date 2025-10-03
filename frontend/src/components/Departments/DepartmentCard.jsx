import React from "react";

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  const getDepartmentIcon = (deptName) => {
    const icons = {
      Engineering: "bi-cpu",
      "Human Resources": "bi-people",
      Sales: "bi-graph-up",
      Marketing: "bi-megaphone",
      Finance: "bi-cash-coin",
      Operations: "bi-gear",
    };
    return icons[deptName] || "bi-building";
  };

  const getDepartmentColor = (deptName) => {
    const colors = {
      Engineering: "primary",
      "Human Resources": "success",
      Sales: "warning",
      Marketing: "info",
      Finance: "danger",
      Operations: "secondary",
    };
    return colors[deptName] || "dark";
  };

  return (
    <div className="card erp-card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">
              <i
                className={`bi ${getDepartmentIcon(
                  department.name
                )} me-2 text-${getDepartmentColor(department.name)}`}
              ></i>
              {department.name}
            </h5>
            <span className="badge bg-secondary">
              {department.departmentId}
            </span>
          </div>
          <span
            className={`badge ${
              department.active ? "bg-success" : "bg-danger"
            }`}
          >
            {department.active ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="card-text text-muted mb-3">{department.description}</p>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted">Employees:</span>
            <span className="fw-bold text-primary">
              {department.employeeCount}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted">Budget:</span>
            <span className="fw-bold text-success">
              ${department.budget?.toLocaleString()}
            </span>
          </div>
          {department.manager && (
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Manager:</span>
              <span className="fw-bold text-info">
                {department.manager.personalInfo?.firstName}{" "}
                {department.manager.personalInfo?.lastName}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar for employee capacity (visual indicator) */}
        <div className="mb-3">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Team Capacity</span>
            <span>{Math.min(department.employeeCount, 10)}/10</span>
          </div>
          <div className="progress" style={{ height: "6px" }}>
            <div
              className={`progress-bar bg-${getDepartmentColor(
                department.name
              )}`}
              style={{
                width: `${Math.min(
                  (department.employeeCount / 10) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Updated:{" "}
            {new Date(department.systemFields?.updatedAt).toLocaleDateString()}
          </small>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-outline-primary"
              onClick={() => onEdit(department)}
              title="Edit Department"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(department._id)}
              title="Delete Department"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
