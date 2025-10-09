import React, { useState, useEffect } from "react";

const DepartmentForm = ({ department, onSave, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
        description: department.description || "",
        budget: department.budget || "",
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

    if (formData.budget && formData.budget < 0) {
      newErrors.budget = "Budget must be a positive number";
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

  const getInputClass = (field) => {
    return `form-control ${errors[field] ? "is-invalid" : ""}`;
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
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
                <label className="form-label fw-semibold">
                  Department Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={getInputClass("name")}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Engineering, Marketing, Sales"
                  disabled={!!department} // Can't change name when editing
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                {department && (
                  <div className="form-text text-muted">
                    Department name cannot be changed after creation
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={getInputClass("description")}
                  rows="3"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the department's purpose and responsibilities..."
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">Annual Budget</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className={getInputClass("budget")}
                    value={formData.budget}
                    onChange={(e) =>
                      handleChange("budget", parseFloat(e.target.value) || "")
                    }
                    placeholder="0.00"
                    min="0"
                    step="1000"
                  />
                </div>
                {errors.budget && (
                  <div className="invalid-feedback">{errors.budget}</div>
                )}
                <div className="form-text">
                  Optional: Set the department's annual budget
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
          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
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
                disabled={loading}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {department ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {department ? "Update Department" : "Create Department"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
