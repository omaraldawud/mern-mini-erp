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
  const [departmentFilter, setDepartmentFilter] = useState(""); // Backend filter

  const location = useLocation();

  // 1️⃣ Read department from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const department = searchParams.get("department") || "";
    setDepartmentFilter(department);
    fetchEmployees(department);
  }, [location.search]);

  // 2️⃣ Fetch employees from backend
  const fetchEmployees = async (department = "") => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (department) params.department = department;
      const response = await employeeAPI.getAll(params);
      const employeeData = response.data.data || response.data;
      setEmployees(employeeData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Employee form handlers
  const handleCreateEmployee = async (data) => {
    /* ... */
  };
  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };
  const handleUpdateEmployee = async (data) => {
    /* ... */
  };
  const handleDeleteEmployee = async (id) => {
    /* ... */
  };

  // Clear backend filter
  const clearFilter = () => {
    setDepartmentFilter("");
    window.history.replaceState({}, "", "/employees");
    fetchEmployees();
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">
            Employees
            {departmentFilter && (
              <span className="badge bg-info ms-2">
                {departmentFilter} Department
                <button
                  className="btn-close btn-close-white ms-2"
                  style={{ fontSize: "0.6rem" }}
                  onClick={clearFilter}
                  aria-label="Clear filter"
                />
              </span>
            )}
          </h1>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
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
          initialFilter={departmentFilter} // Pass backend filter as initial local filter
        />
      )}
    </div>
  );
};

export default Employees;
