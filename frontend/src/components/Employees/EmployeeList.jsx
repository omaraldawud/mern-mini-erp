import React, { useState, useEffect, useRef } from "react";

const EmployeeList = ({
  employees,
  onEdit,
  onTerminate, // Changed from onDelete
  onReinstate, // New prop
  loading = false,
  initialDepartment = "",
}) => {
  const [search, setSearch] = useState(""); // local text search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef(null);

  // Debounce the search input for smoother UX
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Safe getters
  const getEmployeeName = (emp) =>
    emp?.personalInfo
      ? `${emp.personalInfo.firstName || ""} ${
          emp.personalInfo.lastName || ""
        }`.trim()
      : "N/A";

  const getEmployeeEmail = (emp) => emp?.personalInfo?.email || "N/A";
  const getEmployeeDepartment = (emp) =>
    emp?.employmentInfo?.department || "N/A";
  const getEmployeePosition = (emp) => emp?.employmentInfo?.position || "N/A";
  const getEmployeeStatus = (emp) => emp?.employmentInfo?.status || "unknown";

  // Filter employees locally
  const filteredEmployees = employees.filter((emp) => {
    const name = getEmployeeName(emp).toLowerCase();
    const role = getEmployeePosition(emp).toLowerCase();
    const department = getEmployeeDepartment(emp).toLowerCase();

    const searchText = debouncedSearch.toLowerCase();
    const searchMatch = name.includes(searchText) || role.includes(searchText);

    const departmentMatch = initialDepartment
      ? department === initialDepartment.toLowerCase()
      : true;

    return searchMatch && departmentMatch;
  });

  return (
    <div className="card erp-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="bi bi-list-ul me-2"></i>
          Employee List
          {initialDepartment && (
            <span className="badge bg-info ms-2 fs-6">{initialDepartment}</span>
          )}
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

      <div className="card-body">
        {/* Search input */}
        <div className="mb-3 position-relative" style={{ maxWidth: "400px" }}>
          <input
            ref={inputRef}
            type="text"
            className="form-control ps-3 pe-5"
            placeholder="Search by name or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
              style={{
                padding: "0 6px",
                height: "70%",
                borderRadius: "50%",
                lineHeight: 1,
                fontSize: "0.8rem",
              }}
              onClick={() => {
                setSearch("");
                inputRef.current.focus();
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mb-3">
          <small className="text-warning">
            Showing {filteredEmployees.length} of {employees.length} employees
            {initialDepartment && ` in ${initialDepartment}`}
          </small>
        </div>

        {/* Employee table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>
                      <span className="badge bg-secondary">
                        {emp.employeeId || "N/A"}
                      </span>
                    </td>
                    <td>{getEmployeeName(emp)}</td>
                    <td>{getEmployeeEmail(emp)}</td>
                    <td>
                      <span className="badge bg-info">
                        {getEmployeeDepartment(emp)}
                      </span>
                    </td>
                    <td>{getEmployeePosition(emp)}</td>
                    <td>
                      <span
                        className={`badge ${
                          getEmployeeStatus(emp) === "active"
                            ? "bg-success"
                            : getEmployeeStatus(emp) === "on-leave"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {getEmployeeStatus(emp)}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(emp)}
                          disabled={!emp}
                          title="Edit Employee"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        {/* Safe button rendering with fallbacks */}
                        {getEmployeeStatus(emp) === "active" ? (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() =>
                              onTerminate
                                ? onTerminate(emp)
                                : console.warn("onTerminate not provided")
                            }
                            disabled={!emp || !onTerminate}
                            title="Terminate Employee"
                          >
                            <i className="bi bi-person-dash"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success"
                            onClick={() =>
                              onReinstate
                                ? onReinstate(emp)
                                : console.warn("onReinstate not provided")
                            }
                            disabled={!emp || !onReinstate}
                            title="Reinstate Employee"
                          >
                            <i className="bi bi-person-check"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <i className="bi bi-people display-4 d-block mb-2"></i>
                    No employees found
                    {initialDepartment && ` in ${initialDepartment}`}
                    {debouncedSearch && ` matching "${debouncedSearch}"`}
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

export default EmployeeList;
