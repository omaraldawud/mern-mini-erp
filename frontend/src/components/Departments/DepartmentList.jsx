import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentList = ({ departments, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewEmployees = (departmentName) => {
    // Navigate to employees page with department filter
    navigate(`/employees?department=${encodeURIComponent(departmentName)}`);
  };

  return (
    <div className="card erp-card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-building me-2"></i>
          Department List
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Description</th>
                <th>Employees</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments && departments.length > 0 ? (
                departments.map((dept) => (
                  <tr key={dept._id}>
                    <td>
                      <span className="badge bg-secondary">
                        {dept.departmentId}
                      </span>
                    </td>
                    <td>
                      <strong>{dept.name}</strong>
                    </td>
                    <td>{dept.description}</td>
                    <td>
                      <button
                        className="btn btn-link btn-sm p-0 text-decoration-none"
                        onClick={() => handleViewEmployees(dept.name)}
                        title={`View ${dept.employeeCount} employees in ${dept.name}`}
                      >
                        <span className="badge bg-primary">
                          <i className="bi bi-people me-1"></i>
                          {dept.employeeCount} employees
                        </span>
                      </button>
                    </td>
                    <td>${dept.budget?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          dept.active ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {dept.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(dept)}
                          title="Edit Department"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => handleViewEmployees(dept.name)}
                          title="View Employees"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(dept._id)}
                          title="Delete Department"
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
                    <i className="bi bi-building display-4 d-block mb-2"></i>
                    No departments found
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

export default DepartmentList;
