import React from "react";
import { useNavigate } from "react-router-dom";
import { mainDashboardNav } from "../components/Layout/mainDashboardNav";

const MainDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h3 mb-4">Main Dashboard</h1>
      <div className="row g-3">
        {mainDashboardNav.map((module) => (
          <div key={module.name} className="col-md-4">
            <div
              className="card h-100 shadow-sm clickable"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => navigate(module.href)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <i className={`${module.icon} display-4 mb-3`}></i>
                <h5 className="card-title">{module.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboardPage;
