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

  const [activeTab, setActiveTab] = useState("personal");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    if (errors[path]) {
      setErrors((prev) => ({ ...prev, [path]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.personalInfo.firstName.trim()) {
      newErrors["personalInfo.firstName"] = "First name is required";
    }
    if (!formData.personalInfo.lastName.trim()) {
      newErrors["personalInfo.lastName"] = "Last name is required";
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors["personalInfo.email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors["personalInfo.email"] = "Email is invalid";
    }
    if (!formData.employmentInfo.department) {
      newErrors["employmentInfo.department"] = "Department is required";
    }
    if (!formData.employmentInfo.position.trim()) {
      newErrors["employmentInfo.position"] = "Position is required";
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

  const getInputClass = (fieldPath) => {
    return `form-control ${errors[fieldPath] ? "is-invalid" : ""}`;
  };

  return (
    <div className="card border-0 shadow-lg">
      {/* Header with Background Color */}
      <div className="card-header bg-primary text-white py-4">
        <div className="d-flex align-items-center">
          <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
            <i className="bi bi-person-plus-fill fs-2"></i>
          </div>
          <div>
            <h4 className="card-title mb-1 fw-bold">
              {employee ? "Edit Employee" : "Add New Team Member"}
            </h4>
            <p className="mb-0 opacity-75">
              {employee
                ? "Update employee information and role"
                : "Welcome a new member to your team"}
            </p>
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        {/* Tab Navigation */}
        <div className="border-bottom bg-light">
          <ul className="nav nav-pills nav-justified mb-0" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link rounded-0 border-0 py-3 fw-semibold ${
                  activeTab === "personal"
                    ? "active bg-white text-primary border-primary"
                    : "text-muted"
                }`}
                onClick={() => setActiveTab("personal")}
                type="button"
              >
                <i className="bi bi-person-vcard me-2"></i>
                Personal Info
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-0 border-0 py-3 fw-semibold ${
                  activeTab === "employment"
                    ? "active bg-white text-primary border-primary"
                    : "text-muted"
                }`}
                onClick={() => setActiveTab("employment")}
                type="button"
              >
                <i className="bi bi-briefcase me-2"></i>
                Employment Details
              </button>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-lg-10 mx-auto">
                    <div className="mb-4">
                      <h6 className="text-primary mb-4 border-bottom pb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Basic Information
                      </h6>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-person text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className={getInputClass(
                                "personalInfo.firstName"
                              )}
                              value={formData.personalInfo.firstName}
                              onChange={(e) =>
                                handleChange(
                                  "personalInfo.firstName",
                                  e.target.value
                                )
                              }
                              placeholder="Enter first name"
                            />
                            {errors["personalInfo.firstName"] && (
                              <div className="invalid-feedback d-block">
                                {errors["personalInfo.firstName"]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-person text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className={getInputClass("personalInfo.lastName")}
                              value={formData.personalInfo.lastName}
                              onChange={(e) =>
                                handleChange(
                                  "personalInfo.lastName",
                                  e.target.value
                                )
                              }
                              placeholder="Enter last name"
                            />
                            {errors["personalInfo.lastName"] && (
                              <div className="invalid-feedback d-block">
                                {errors["personalInfo.lastName"]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-envelope text-muted"></i>
                            </span>
                            <input
                              type="email"
                              className={getInputClass("personalInfo.email")}
                              value={formData.personalInfo.email}
                              onChange={(e) =>
                                handleChange(
                                  "personalInfo.email",
                                  e.target.value
                                )
                              }
                              placeholder="employee@company.com"
                            />
                            {errors["personalInfo.email"] && (
                              <div className="invalid-feedback d-block">
                                {errors["personalInfo.email"]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Phone Number
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-phone text-muted"></i>
                            </span>
                            <input
                              type="tel"
                              className="form-control"
                              value={formData.personalInfo.phone}
                              onChange={(e) =>
                                handleChange(
                                  "personalInfo.phone",
                                  e.target.value
                                )
                              }
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Date of Birth
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-calendar text-muted"></i>
                            </span>
                            <input
                              type="date"
                              className="form-control"
                              value={formData.personalInfo.dateOfBirth}
                              onChange={(e) =>
                                handleChange(
                                  "personalInfo.dateOfBirth",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employment Information Tab */}
            {activeTab === "employment" && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-lg-10 mx-auto">
                    <div className="mb-4">
                      <h6 className="text-primary mb-4 border-bottom pb-2">
                        <i className="bi bi-building me-2"></i>
                        Employment Details
                      </h6>

                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Department <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-diagram-3 text-muted"></i>
                            </span>
                            <select
                              className={getInputClass(
                                "employmentInfo.department"
                              )}
                              value={formData.employmentInfo.department}
                              onChange={(e) =>
                                handleChange(
                                  "employmentInfo.department",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Department</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Human Resources">
                                Human Resources
                              </option>
                              <option value="Sales">Sales</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Finance">Finance</option>
                              <option value="Operations">Operations</option>
                            </select>
                            {errors["employmentInfo.department"] && (
                              <div className="invalid-feedback d-block">
                                {errors["employmentInfo.department"]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Position <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-briefcase text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className={getInputClass(
                                "employmentInfo.position"
                              )}
                              value={formData.employmentInfo.position}
                              onChange={(e) =>
                                handleChange(
                                  "employmentInfo.position",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Senior Developer, HR Manager"
                            />
                            {errors["employmentInfo.position"] && (
                              <div className="invalid-feedback d-block">
                                {errors["employmentInfo.position"]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Employment Type
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-clock text-muted"></i>
                            </span>
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
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Annual Salary
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-currency-dollar text-muted"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control"
                              value={formData.employmentInfo.salary}
                              onChange={(e) =>
                                handleChange(
                                  "employmentInfo.salary",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                              min="0"
                              step="1000"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Hire Date
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-calendar-check text-muted"></i>
                            </span>
                            <input
                              type="date"
                              className="form-control"
                              value={formData.employmentInfo.hireDate}
                              onChange={(e) =>
                                handleChange(
                                  "employmentInfo.hireDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="border-top pt-4 mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Fields marked with <span className="text-danger">
                      *
                    </span>{" "}
                    are required
                  </small>
                </div>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {employee ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        {employee ? "Update Employee" : "Create Employee"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
