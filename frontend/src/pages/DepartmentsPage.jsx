import React, { useState, useEffect } from "react";
import DepartmentList from "../components/Departments/DepartmentList";
import DepartmentCard from "../components/Departments/DepartmentCard";
import DepartmentForm from "../components/Departments/DepartmentForm";
import { departmentAPI } from "../services/api";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await departmentAPI.getAll();
      console.log("Departments data:", response.data);

      const deptData = response.data.data || response.data;
      setDepartments(deptData || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError(
        "Failed to load departments. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // ... keep the rest of the handle functions the same, but remove employee-related code

  const handleCreateDepartment = async (departmentData) => {
    try {
      await departmentAPI.create(departmentData);
      setShowForm(false);
      fetchData();
      alert("Department created successfully!");
    } catch (error) {
      alert("Failed to create department");
    }
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleUpdateDepartment = async (departmentData) => {
    try {
      await departmentAPI.update(editingDepartment._id, departmentData);
      setShowForm(false);
      setEditingDepartment(null);
      fetchData();
      alert("Department updated successfully!");
    } catch (error) {
      alert("Failed to update department");
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this department? This action cannot be undone."
      )
    ) {
      try {
        await departmentAPI.delete(departmentId);
        fetchData();
        alert("Department deleted successfully!");
      } catch (error) {
        alert("Failed to delete department");
      }
    }
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
          <p>Loading departments...</p>
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
              onClick={fetchData}
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
            <i className="bi bi-building me-2"></i>
            Departments
          </h1>
          <p className="text-muted mb-0">
            Manage company departments ({departments.length} total)
          </p>
        </div>

        <div className="d-flex gap-2">
          {/* View Mode Toggle */}
          <div className="btn-group">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                viewMode === "table" ? "active" : ""
              }`}
              onClick={() => setViewMode("table")}
            >
              <i className="bi bi-list-ul me-2"></i>
              Table
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                viewMode === "card" ? "active" : ""
              }`}
              onClick={() => setViewMode("card")}
            >
              <i className="bi bi-grid-3x3-gap me-2"></i>
              Cards
            </button>
          </div>

          {/* Add Department Button */}
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Department
          </button>
        </div>
      </div>

      {showForm ? (
        <DepartmentForm
          department={editingDepartment}
          employees={employees}
          onSave={
            editingDepartment ? handleUpdateDepartment : handleCreateDepartment
          }
          onCancel={() => {
            setShowForm(false);
            setEditingDepartment(null);
          }}
        />
      ) : viewMode === "table" ? (
        <DepartmentList
          departments={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
        />
      ) : (
        <div className="row">
          {departments.map((department) => (
            <div
              key={department._id}
              className="col-xl-4 col-lg-6 col-md-6 mb-4"
            >
              <DepartmentCard
                department={department}
                onEdit={handleEditDepartment}
                onDelete={handleDeleteDepartment}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!showForm && departments.length === 0 && (
        <div className="card erp-card">
          <div className="card-body text-center py-5">
            <i className="bi bi-building display-1 text-muted"></i>
            <h5 className="text-muted mt-3">No Departments Found</h5>
            <p className="text-muted mb-4">
              Get started by creating your first department
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Create First Department
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
