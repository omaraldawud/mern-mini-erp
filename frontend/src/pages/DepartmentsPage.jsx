import React, { useState, useEffect } from "react";
import DepartmentList from "../components/Departments/DepartmentList";
import DepartmentCard from "../components/Departments/DepartmentCard";
import DepartmentForm from "../components/Departments/DepartmentForm";
import ConfirmationModal from "../components/Common/ConfirmationModal";
import { departmentAPI } from "../services/api";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await departmentAPI.getAll();
      const deptData = response.data.data || response.data;
      setDepartments(deptData || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError(
        "Failed to load departments. Please check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDepartment = async (departmentData) => {
    try {
      setActionLoading(true);
      await departmentAPI.create(departmentData);

      setSuccessMessage("Department created successfully!");
      setShowForm(false);
      fetchDepartments();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Create department error:", error);
      setError(error.response?.data?.message || "Failed to create department");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleUpdateDepartment = async (departmentData) => {
    try {
      setActionLoading(true);
      await departmentAPI.update(editingDepartment._id, departmentData);

      setSuccessMessage("Department updated successfully!");
      setShowForm(false);
      setEditingDepartment(null);
      fetchDepartments();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update department error:", error);
      setError(error.response?.data?.message || "Failed to update department");
    } finally {
      setActionLoading(false);
    }
  };

  // DELETE Department with Confirmation Modal
  const handleDeleteClick = (department) => {
    // console.log("🔍 Department object received:", department);
    // console.log("🔍 departmentId:", department.departmentId);
    // console.log("🔍 _id:", department._id);

    setDepartmentToDelete(department);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!departmentToDelete) return;

    try {
      setActionLoading(true);

      // Use _id instead of departmentId
      await departmentAPI.delete(departmentToDelete._id);

      setSuccessMessage(
        `Department "${departmentToDelete.name}" deleted successfully!`
      );
      setShowConfirmModal(false);
      setDepartmentToDelete(null);
      fetchDepartments();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Delete department error:", error);
      setError(error.response?.data?.message || "Failed to delete department");
      setShowConfirmModal(false);
      setDepartmentToDelete(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setDepartmentToDelete(null);
  };

  const clearMessages = () => {
    setError("");
    setSuccessMessage("");
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

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-check-circle me-2"></i>
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage("")}
          ></button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

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
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={actionLoading}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Department
          </button>
        </div>
      </div>

      {showForm ? (
        <DepartmentForm
          department={editingDepartment}
          onSave={
            editingDepartment ? handleUpdateDepartment : handleCreateDepartment
          }
          onCancel={() => {
            setShowForm(false);
            setEditingDepartment(null);
            clearMessages();
          }}
          loading={actionLoading}
        />
      ) : viewMode === "table" ? (
        <DepartmentList
          departments={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteClick} // Updated to use modal
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
                onDelete={handleDeleteClick} // Updated to use modal
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Department"
        message={
          departmentToDelete
            ? `Are you sure you want to delete the "${departmentToDelete.name}" department? This action cannot be undone and will remove all associated data.`
            : "Are you sure you want to delete this department?"
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default DepartmentsPage;
