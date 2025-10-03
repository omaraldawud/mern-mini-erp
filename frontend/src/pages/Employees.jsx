import React from "react";

const Employees = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <i className="bi bi-people me-2"></i>
            Employees
          </h1>
          <p className="text-muted mb-0">Manage your team members</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>
          Add Employee
        </button>
      </div>

      <div className="card erp-card">
        <div className="card-body">
          <div className="text-center py-5">
            <i className="bi bi-people display-1 text-muted"></i>
            <h5 className="text-muted mt-3">Employee Management</h5>
            <p className="text-muted">
              Backend is ready - frontend integration coming next!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
