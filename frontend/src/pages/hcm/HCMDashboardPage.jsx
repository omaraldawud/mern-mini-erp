import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeAPI, departmentAPI } from "../../services/api";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    activeEmployees: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setStats((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch all employees and departments in parallel
      const [employeesResponse, departmentsResponse] = await Promise.all([
        employeeAPI.getAll(),
        departmentAPI.getAll(),
      ]);

      const employees =
        employeesResponse.data.data || employeesResponse.data || [];
      const departments =
        departmentsResponse.data.data || departmentsResponse.data || [];

      // Calculate stats
      const totalEmployees = employees.length;
      const totalDepartments = departments.length;
      const activeEmployees = employees.filter(
        (emp) => emp.employmentInfo?.status === "active"
      ).length;

      setStats({
        totalEmployees,
        totalDepartments,
        activeEmployees,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard statistics",
      }));
    }
  };

  const handleAddEmployee = () => {
    navigate("/hcm/employees?action=create");
  };

  const handleViewReports = () => {
    // You can add reports navigation later
    navigate("/reports");
  };

  const handleViewEmployees = () => {
    navigate("/hcm/employees");
  };

  const handleViewDepartments = () => {
    navigate("/hcm/departments");
  };

  if (stats.loading) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-1">Dashboard</h1>
            <p className="text-muted mb-0">
              Welcome to MercuryERP HR Management
            </p>
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading dashboard statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-1">Dashboard</h1>
            <p className="text-muted mb-0">
              Welcome to MercuryERP HR Management
            </p>
          </div>
        </div>
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {stats.error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchDashboardStats}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Welcome to MercuryERP HR Management</p>
        </div>
        <div>
          <small className="text-muted">
            Last updated: {new Date().toLocaleTimeString()}
          </small>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div
            className="card erp-card erp-stat-card clickable"
            onClick={handleViewEmployees}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title text-white">Total Employees</h5>
                  <h2 className="text-white">{stats.totalEmployees}</h2>
                  <small className="text-white-50">
                    {stats.activeEmployees} active •{" "}
                    {stats.totalEmployees - stats.activeEmployees} inactive
                  </small>
                </div>
                <i className="bi bi-people display-4 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card erp-card bg-success text-white clickable"
            onClick={handleViewDepartments}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Departments</h5>
                  <h2>{stats.totalDepartments}</h2>
                  <small className="text-white-50">
                    Across the organization
                  </small>
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
                  <h2>{stats.activeEmployees}</h2>
                  <small className="text-dark-50">
                    {Math.round(
                      (stats.activeEmployees / stats.totalEmployees) * 100
                    )}
                    % of workforce
                  </small>
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
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-primary" onClick={handleAddEmployee}>
              <i className="bi bi-person-plus me-2"></i>
              Add Employee
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleViewEmployees}
            >
              <i className="bi bi-people me-2"></i>
              View All Employees
            </button>
            <button
              className="btn btn-outline-success"
              onClick={handleViewDepartments}
            >
              <i className="bi bi-building me-2"></i>
              Manage Departments
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleViewReports}
            >
              <i className="bi bi-graph-up me-2"></i>
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={fetchDashboardStats}
          disabled={stats.loading}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          {stats.loading ? "Refreshing..." : "Refresh Stats"}
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
