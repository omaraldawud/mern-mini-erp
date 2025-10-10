import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentList = ({ departments, onEdit, onDelete, loading = false }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef(null);

  // Debounce search for better performance
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const handleViewEmployees = (departmentName) => {
    navigate(`/hcm/employees?department=${encodeURIComponent(departmentName)}`);
  };

  // Filter departments based on search - ADD THIS FUNCTION
  const filteredDepartments = departments.filter((dept) => {
    if (!debouncedSearch) return true;

    const name = dept.name?.toLowerCase() || "";
    const description = dept.description?.toLowerCase() || "";
    const searchText = debouncedSearch.toLowerCase();

    return name.includes(searchText) || description.includes(searchText);
  });

  return (
    <div className="card erp-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">
            <i className="bi bi-building me-2"></i>
            Department List
          </h5>
          {loading && (
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>

        {/* ADD SEARCH BAR - KEEP EXISTING STRUCTURE */}
        <div className="mt-3">
          <div className="position-relative" style={{ maxWidth: "400px" }}>
            <input
              ref={inputRef}
              type="text"
              className="form-control ps-4 ms-2"
              placeholder="Search departments by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 px-1 text-primary"></i>
            {search && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                onClick={() => {
                  setSearch("");
                  inputRef.current?.focus();
                }}
                style={{ padding: "2px 6px", fontSize: "0.7rem" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        {/* ADD RESULTS COUNT */}
        {departments.length > 0 && (
          <div className="p-3 border-bottom bg-light">
            <small className="text-muted">
              Showing {filteredDepartments.length} of {departments.length}{" "}
              departments
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </small>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Description</th>
                <th>Employees</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments && filteredDepartments.length > 0 ? (
                filteredDepartments.map((dept) => (
                  <tr key={dept._id}>
                    <td>
                      <span className="badge bg-secondary">
                        {dept.departmentId}
                      </span>
                    </td>
                    <td>
                      <strong>{dept.name}</strong>
                    </td>
                    <td>{dept.description}</td>
                    <td>
                      <button
                        className="btn btn-link btn-sm p-0 text-decoration-none"
                        onClick={() => handleViewEmployees(dept.name)}
                        title={`View ${dept.employeeCount} employees in ${dept.name}`}
                      >
                        <span className="badge bg-primary">
                          <i className="bi bi-people me-1"></i>
                          {dept.employeeCount} employees
                        </span>
                      </button>
                    </td>
                    <td>${dept.budget?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          dept.active ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {dept.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(dept)}
                          title="Edit Department"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => handleViewEmployees(dept.name)}
                          title="View Employees"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(dept)} // Make sure this passes the FULL department object, not just dept._id
                          title="Delete Department"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <i className="bi bi-building display-4 d-block mb-2"></i>
                    {departments.length === 0 ? (
                      "No departments found. Create your first department to get started!"
                    ) : (
                      <>
                        No departments found matching "{debouncedSearch}"
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSearch("")}
                          >
                            Clear Search
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
