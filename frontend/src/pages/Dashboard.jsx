import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Welcome to MercuryERP HR Management</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card erp-card erp-stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title text-white">Total Employees</h5>
                  <h2 className="text-white">20</h2>
                </div>
                <i className="bi bi-people display-4 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card erp-card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Departments</h5>
                  <h2>3</h2>
                </div>
                <i className="bi bi-building display-4 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card erp-card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Active Today</h5>
                  <h2>18</h2>
                </div>
                <i className="bi bi-person-check display-4 text-dark-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card erp-card">
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-lightning me-2"></i>
            Quick Actions
          </h5>
          <div className="d-flex gap-2">
            <button className="btn btn-primary">
              <i className="bi bi-person-plus me-2"></i>
              Add Employee
            </button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-graph-up me-2"></i>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
