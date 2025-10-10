import React from "react";
import { Link, useLocation } from "react-router-dom";
import { mainDashboardNav } from "./mainDashboardNav";
import { hcmDashboardNav } from "./hcmDashboardNav";
import { scmDashboardNav } from "./scmDashboardNav";

const moduleNavs = {
  main: mainDashboardNav,
  hcm: hcmDashboardNav,
  scm: scmDashboardNav,
  // finance: financeDashboardNav, // future
};

const Sidebar = ({ module }) => {
  const location = useLocation();
  const navToUse = moduleNavs[module] || [];

  return (
    <div className="erp-sidebar text-white" style={{ width: "300px" }}>
      <div className="p-4 border-bottom border-secondary">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-cpu fs-5 text-primary me-2"></i>
          <h5 className="mb-0 fw-bold text-white">Mercury ERP</h5>
        </div>
        <div className="d-flex align-items-center">
          <span className="badge bg-warning text-dark d-flex align-items-center py-2">
            <i className="bi-person-badge me-2"></i>
            {module ? module.toUpperCase() : "MAIN"} Module
          </span>
        </div>
      </div>

      <nav className="p-3">
        <ul className="nav nav-pills flex-column">
          {navToUse.length === 0 && (
            <li className="nav-item mb-2 text-light">No menu available</li>
          )}
          {navToUse.map((item) => (
            <li key={item.name} className="nav-item mb-2">
              <Link
                to={item.href}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.href
                    ? "active bg-primary"
                    : "text-light"
                }`}
              >
                <i className={`${item.icon} me-3`}></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
