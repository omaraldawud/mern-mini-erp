import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmployeeList from "../components/Employees/EmployeeList";
import EmployeeForm from "../components/Employees/EmployeeForm";
import { employeeAPI } from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Parse URL query parameters when component mounts or URL changes
    const searchParams = new URLSearchParams(location.search);
    const department = searchParams.get("department");

    if (department) {
      setDepartmentFilter(department);
    }

    fetchEmployees(department);
  }, [location.search]); // Re-fetch when URL parameters change

  const fetchEmployees = async (department = "") => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (department) {
        params.department = department;
      }

      const response = await employeeAPI.getAll(params);
      const employeeData = response.data.data || response.data;
      setEmployees(employeeData || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData);
      setShowForm(false);
      fetchEmployees();
      alert("Employee created successfully!");
    } catch (error) {
      alert("Failed to create employee");
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      await employeeAPI.update(editingEmployee._id, employeeData);
      setShowForm(false);
      setEditingEmployee(null);
      fetchEmployees();
      alert("Employee updated successfully!");
    } catch (error) {
      alert("Failed to update employee");
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeAPI.delete(employeeId);
        fetchEmployees();
        alert("Employee deleted successfully!");
      } catch (error) {
        alert("Failed to delete employee");
      }
    }
  };

  const clearFilter = () => {
    setDepartmentFilter("");
    // Remove the query parameter from URL
    window.history.replaceState({}, "", "/employees");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <div className="mt-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={fetchEmployees}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <i className="bi bi-people me-2"></i>
            Employees
            {departmentFilter && (
              <span className="ms-2">
                <span className="badge bg-info fs-6">
                  {departmentFilter} Department
                  <button
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: "0.6rem" }}
                    onClick={clearFilter}
                    aria-label="Clear filter"
                  ></button>
                </span>
              </span>
            )}
          </h1>
          <p className="text-muted mb-0">
            Manage your team members ({employees.length} total)
            {departmentFilter && ` in ${departmentFilter}`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-person-plus me-2"></i>
          Add Employee
        </button>
      </div>

      {showForm ? (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default Employees;
