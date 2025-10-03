import React from "react";

const DepartmentList = ({ departments, onEdit, onDelete }) => {
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
                      <span className="badge bg-primary">
                        {dept.employeeCount} employees
                      </span>
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
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(dept._id)}
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
