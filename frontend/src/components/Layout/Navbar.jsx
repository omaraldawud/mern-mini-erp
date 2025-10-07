import React from "react";
import { Dropdown, NavDropdown } from "react-bootstrap";

//
const Navbar = () => {
  return (
    <nav className="navbar navbar-dark erp-navbar shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <i className="bi bi-building me-2"></i>
          HR Management System - HCM
        </span>

        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              <i className="bi bi-person-circle me-2"></i>
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="#">
                <i className="bi bi-person me-2"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="bi bi-gear me-2"></i>Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
