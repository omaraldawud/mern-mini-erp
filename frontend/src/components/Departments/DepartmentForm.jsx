import React, { useState, useEffect } from "react";

const DepartmentForm = ({ department, onSave, onCancel, employees = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    manager: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
        description: department.description || "",
        budget: department.budget || "",
        manager: department.manager?._id || "",
        active: department.active !== undefined ? department.active : true,
      });
    }
  }, [department]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.budget || formData.budget < 0) {
      newErrors.budget = "Valid budget amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  const departmentOptions = [
    "Engineering",
    "Human Resources",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
  ];

  return (
    <div className="card erp-card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-building me-2"></i>
          {department ? "Edit Department" : "Create New Department"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                {department ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    disabled
                    readOnly
                  />
                ) : (
                  <select
                    className={`form-select ${errors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                )}
                {errors.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  rows="3"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the department's purpose and responsibilities..."
                  required
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback d-block">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Annual Budget <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.budget ? "is-invalid" : ""
                    }`}
                    value={formData.budget}
                    onChange={(e) =>
                      handleChange("budget", parseFloat(e.target.value) || "")
                    }
                    min="0"
                    step="1000"
                    placeholder="0.00"
                    required
                  />
                </div>
                {errors.budget && (
                  <div className="invalid-feedback d-block">
                    {errors.budget}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Department Manager</label>
                <select
                  className="form-select"
                  value={formData.manager}
                  onChange={(e) => handleChange("manager", e.target.value)}
                >
                  <option value="">No Manager Assigned</option>
                  {employees
                    .filter(
                      (emp) => emp.employmentInfo.department === formData.name
                    )
                    .map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.personalInfo.firstName}{" "}
                        {employee.personalInfo.lastName}
                      </option>
                    ))}
                </select>
                <div className="form-text">
                  Only employees from this department can be assigned as manager
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="activeSwitch"
                    checked={formData.active}
                    onChange={(e) => handleChange("active", e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="activeSwitch">
                    Department Active
                  </label>
                </div>
                <div className="form-text">
                  Inactive departments won't appear in certain reports and
                  filters
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <div>
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Fields marked with <span className="text-danger">*</span> are
                required
              </small>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>
                {department ? "Update Department" : "Create Department"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
