import React, { useState, useEffect } from "react";
import { employeeAPI, departmentAPI } from "../services/api";

const WorkforceAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [employeesResponse, departmentsResponse] = await Promise.all([
        employeeAPI.getAll(),
        departmentAPI.getAll(),
      ]);

      const employees =
        employeesResponse.data.data || employeesResponse.data || [];
      const departments =
        departmentsResponse.data.data || departmentsResponse.data || [];

      const analyticsData = calculateBasicAnalytics(employees, departments);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBasicAnalytics = (employees, departments) => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(
      (emp) => emp.employmentInfo?.status === "active"
    ).length;

    const totalSalary = employees.reduce(
      (sum, emp) => sum + (emp.employmentInfo?.salary || 0),
      0
    );
    const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

    const departmentDistribution = departments.map((dept) => ({
      name: dept.name,
      count: employees.filter(
        (emp) => emp.employmentInfo?.department === dept.name
      ).length,
      budget: dept.budget || 0,
    }));

    const terminatedCount = employees.filter(
      (emp) => emp.employmentInfo?.status === "terminated"
    ).length;
    const turnoverRate =
      totalEmployees > 0 ? (terminatedCount / totalEmployees) * 100 : 0;

    return {
      headcount: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: totalEmployees - activeEmployees,
        growthRate: "+12% YoY",
      },
      cost: {
        totalSalary,
        avgSalary,
        formattedAvgSalary: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(avgSalary),
      },
      departments: departmentDistribution,
      retention: {
        turnoverRate: turnoverRate.toFixed(1),
        avgTenure: "2.8 years",
      },
    };
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "40vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-2" role="status"></div>
          <p className="mb-0">Loading workforce analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Compact Header */}
      <div className="text-center mb-4 py-4 bg-light rounded">
        <h1 className="h2 fw-bold text-primary mb-2">📊 Workforce Analytics</h1>
        <p className="text-muted mb-3">
          Transform your HR data into strategic insights
        </p>
        <div className="alert alert-info py-2 d-inline-block mb-0">
          <i className="bi bi-megaphone me-2"></i>
          <strong>Coming Soon:</strong> Advanced analytics features in
          development
        </div>
      </div>

      {/* Current Analytics - Compact Layout */}
      {analytics && (
        <div className="row mb-4">
          <div className="col-12 mb-3">
            <h5 className="mb-3">
              <i className="bi bi-graph-up me-2"></i>
              Current Workforce Overview
            </h5>
          </div>

          {/* Headcount Metrics - Smaller Cards */}
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center py-3">
                <i className="bi bi-people fs-2 text-primary mb-2"></i>
                <h4 className="text-primary mb-1">
                  {analytics.headcount.total}
                </h4>
                <p className="text-muted mb-1 small">Total Employees</p>
                <small className="text-success">
                  <i className="bi bi-arrow-up me-1"></i>
                  {analytics.headcount.growthRate}
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center py-3">
                <i className="bi bi-person-check fs-2 text-success mb-2"></i>
                <h4 className="text-success mb-1">
                  {analytics.headcount.active}
                </h4>
                <p className="text-muted mb-1 small">Active Employees</p>
                <small className="text-muted">
                  {Math.round(
                    (analytics.headcount.active / analytics.headcount.total) *
                      100
                  )}
                  % of workforce
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center py-3">
                <i className="bi bi-currency-dollar fs-2 text-warning mb-2"></i>
                <h6 className="text-warning mb-1">
                  {analytics.cost.formattedAvgSalary}
                </h6>
                <p className="text-muted mb-1 small">Average Salary</p>
                <small className="text-muted">
                  Across {analytics.headcount.total} employees
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center py-3">
                <i className="bi bi-graph-down fs-2 text-info mb-2"></i>
                <h6 className="text-info mb-1">
                  {analytics.retention.turnoverRate}%
                </h6>
                <p className="text-muted mb-1 small">Turnover Rate</p>
                <small className="text-muted">Year to date</small>
              </div>
            </div>
          </div>

          {/* Department Distribution - Compact */}
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h6 className="card-title mb-0">
                  <i className="bi bi-diagram-3 me-2"></i>
                  Department Distribution
                </h6>
              </div>
              <div className="card-body py-3">
                <div className="row g-2">
                  {analytics.departments.map((dept) => (
                    <div key={dept.name} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="d-flex justify-content-between align-items-center p-2 border rounded">
                        <div>
                          <h6 className="mb-0 small">{dept.name}</h6>
                          <small className="text-muted">
                            {dept.count} employees
                          </small>
                        </div>
                        <span className="badge bg-primary">
                          {Math.round(
                            (dept.count / analytics.headcount.total) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Features - Compact */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="card-title mb-0">
                <i className="bi bi-lightning me-2"></i>
                Advanced Analytics - Coming Soon
              </h6>
            </div>
            <div className="card-body py-3">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-primary mb-2 small">
                    📈 Predictive Analytics
                  </h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Retention risk scoring</small>
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Workforce forecasting</small>
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Skills gap analysis</small>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="text-primary mb-2 small">🔍 Deep Insights</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Performance correlations</small>
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Cost per hire analysis</small>
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-check-circle text-success me-1 small"></i>
                      <small>Diversity & inclusion metrics</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Contribution Section */}
      <div className="text-center p-4 bg-light rounded">
        <h5 className="mb-2">Interested in Building Advanced Analytics?</h5>
        <p className="text-muted mb-3 small">
          We're looking for developers to help build the next generation of
          workforce analytics features.
        </p>
        <div className="row justify-content-center g-3 mb-3">
          <div className="col-md-5">
            <h6 className="small mb-2">Frontend Opportunities</h6>
            <ul className="text-muted small mb-0">
              <li>React charts & data visualizations</li>
              <li>Interactive dashboards</li>
              <li>Real-time data updates</li>
            </ul>
          </div>
          <div className="col-md-5">
            <h6 className="small mb-2">Backend Opportunities</h6>
            <ul className="text-muted small mb-0">
              <li>Analytics algorithms</li>
              <li>MongoDB aggregation pipelines</li>
              <li>Predictive modeling</li>
            </ul>
          </div>
        </div>
        <a href="https://github.com/omaraldawud/mern-mini-erp">
          <button className="btn btn-primary btn-sm">
            <i className="bi bi-github me-1"></i>
            Contribute on GitHub
          </button>
        </a>
      </div>
    </div>
  );
};

export default WorkforceAnalyticsPage;
