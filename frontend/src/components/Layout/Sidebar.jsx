import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "bi-speedometer2" },
    { name: "Employees", href: "/employees", icon: "bi-people" },
    { name: "Departments", href: "/departments", icon: "bi-building" },
  ];

  return (
    <div className="erp-sidebar text-white" style={{ width: "250px" }}>
      <div className="p-4 border-bottom border-secondary">
        <h5 className="mb-0">
          <i className="bi bi-cpu me-2"></i>
          Mercury ERP
        </h5>
        <small className="text-primary">HR System</small>
      </div>

      <nav className="p-3">
        <ul className="nav nav-pills flex-column">
          {navigation.map((item) => (
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
