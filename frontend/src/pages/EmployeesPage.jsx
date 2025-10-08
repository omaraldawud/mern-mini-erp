import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmployeeList from "../components/Employees/EmployeeList";
import EmployeeForm from "../components/Employees/EmployeeForm";
import ConfirmationModal from "../components/Common/ConfirmationModal";
import { employeeAPI } from "../services/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToAction, setEmployeeToAction] = useState(null);
  const [actionType, setActionType] = useState(""); // "terminate" or "reinstate"

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
      setError(
        "Failed to load employees. Please check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ CREATE Employee
  const handleCreateEmployee = async (employeeData) => {
    try {
      setLoading(true);
      await employeeAPI.create(employeeData);

      setSuccessMessage("Employee created successfully!");
      setShowForm(false);
      fetchEmployees(departmentFilter);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Create employee error:", error);
      setError(error.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ UPDATE Employee
  const handleUpdateEmployee = async (employeeData) => {
    try {
      setLoading(true);
      const employeeId = editingEmployee.employeeId;
      await employeeAPI.update(employeeId, employeeData);

      setSuccessMessage("Employee updated successfully!");
      setShowForm(false);
      setEditingEmployee(null);
      fetchEmployees(departmentFilter);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update employee error:", error);
      setError(error.response?.data?.message || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  // 5️⃣ TERMINATE/RESTORE Employee - Show confirmation modal
  const handleTerminateEmployee = (employee) => {
    console.log("🟡 Terminate button clicked:", employee);

    setEmployeeToAction(employee);
    setActionType("terminate");
    setShowConfirmModal(true);
  };

  const handleReinstateEmployee = (employee) => {
    console.log("🟢 Reinstate button clicked:", employee);
    setEmployeeToAction(employee);

    setActionType("reinstate");
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!employeeToAction) return;

    try {
      setLoading(true);

      if (actionType === "terminate") {
        // Soft delete - set status to terminated
        await employeeAPI.delete(employeeToAction.employeeId);
        setSuccessMessage(
          `Employee ${employeeToAction.personalInfo.firstName} ${employeeToAction.personalInfo.lastName} terminated successfully!`
        );
      } else {
        // Reinstate - set status to active
        await employeeAPI.update(employeeToAction.employeeId, {
          employmentInfo: {
            ...employeeToAction.employmentInfo,
            status: "active",
          },
        });
        setSuccessMessage(
          `Employee ${employeeToAction.personalInfo.firstName} ${employeeToAction.personalInfo.lastName} reinstated successfully!`
        );
      }

      setShowConfirmModal(false);
      setEmployeeToAction(null);
      setActionType("");
      fetchEmployees(departmentFilter);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Employee action error:", error);
      setError(
        error.response?.data?.message || `Failed to ${actionType} employee`
      );
      setShowConfirmModal(false);
      setEmployeeToAction(null);
      setActionType("");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setEmployeeToAction(null);
    setActionType("");
  };

  // 6️⃣ EDIT Employee - Open form with employee data
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // 7️⃣ Clear backend filter
  const clearFilter = () => {
    setDepartmentFilter("");
    window.history.replaceState({}, "", "/employees");
    fetchEmployees();
  };

  // 8️⃣ Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
    setError("");
  };

  // Get modal content based on action type
  const getModalContent = () => {
    if (!employeeToAction) return { title: "", message: "" };

    const fullName = `${employeeToAction.personalInfo.firstName} ${employeeToAction.personalInfo.lastName}`;

    if (actionType === "terminate") {
      return {
        title: "Terminate Employee",
        message: `Are you sure you want to terminate ${fullName}? This action will change their employment status to "terminated" and they will no longer appear in active employee lists.`,
        confirmText: "Yes, Terminate",
        variant: "danger",
      };
    } else {
      return {
        title: "Reinstate Employee",
        message: `Are you sure you want to reinstate ${fullName}? This action will change their employment status to "active" and they will appear in active employee lists.`,
        confirmText: "Yes, Reinstate",
        variant: "success",
      };
    }
  };

  const modalContent = getModalContent();

  // Loading state
  if (loading && employees.length === 0) {
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

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <i className="bi bi-people me-2"></i>
            Employees
            {departmentFilter && (
              <span className="badge bg-info ms-2 fs-6">
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
          <p className="text-muted mb-0">
            Manage your team members ({employees.length} total)
            {departmentFilter && ` in ${departmentFilter}`}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <i className="bi bi-person-plus me-2"></i>
          Add Employee
        </button>
      </div>

      {/* Employee Form or List */}
      {showForm ? (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
          onCancel={handleCancelForm}
          loading={loading}
        />
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
          onTerminate={handleTerminateEmployee}
          onReinstate={handleReinstateEmployee}
          loading={loading}
          initialDepartment={departmentFilter}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={handleCancelAction}
        onConfirm={handleConfirmAction}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.confirmText}
        cancelText="Cancel"
        variant={modalContent.variant}
      />
    </div>
  );
};

export default EmployeesPage;
