import React, { useState, useEffect } from "react";

const EmployeeForm = ({ employee, onSave, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      dateOfBirth: "",
    },
    employmentInfo: {
      department: "",
      position: "",
      hireDate: "",
      employmentType: "full-time",
      salary: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="card erp-card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-person-plus me-2"></i>
          {employee ? "Edit Employee" : "Add New Employee"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h6 className="border-bottom pb-2 mb-3">Personal Information</h6>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.personalInfo.firstName}
                    onChange={(e) =>
                      handleChange("personalInfo.firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.personalInfo.lastName}
                    onChange={(e) =>
                      handleChange("personalInfo.lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleChange("personalInfo.email", e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handleChange("personalInfo.phone", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <h6 className="border-bottom pb-2 mb-3">
                Employment Information
              </h6>

              <div className="mb-3">
                <label className="form-label">Department *</label>
                <select
                  className="form-select"
                  value={formData.employmentInfo.department}
                  onChange={(e) =>
                    handleChange("employmentInfo.department", e.target.value)
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Position *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.employmentInfo.position}
                  onChange={(e) =>
                    handleChange("employmentInfo.position", e.target.value)
                  }
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-select"
                    value={formData.employmentInfo.employmentType}
                    onChange={(e) =>
                      handleChange(
                        "employmentInfo.employmentType",
                        e.target.value
                      )
                    }
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.employmentInfo.salary}
                    onChange={(e) =>
                      handleChange("employmentInfo.salary", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  {employee ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  {employee ? "Update Employee" : "Create Employee"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
