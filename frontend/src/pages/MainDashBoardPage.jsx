import React from "react";
import { useNavigate } from "react-router-dom";
import { mainDashboardNav } from "../components/Layout/mainDashboardNav";
// styles
import { moduleCardStyles } from "../../reactUtils/moduleCardStyles";

const MainDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h3 mb-4">Main Dashboard</h1>
      <div className="row g-3">
        {mainDashboardNav.map((module) => {
          // derive key for moduleCardStyles
          const key = module.name.toLowerCase().split(" ")[0]; // e.g., "HCM Module" -> "hcm"
          const style = moduleCardStyles[key] || {
            bg: "bg-light",
            text: "text-dark",
          };

          return (
            <div key={module.name} className="col-md-4">
              <div
                className={`card h-100 shadow-sm clickable ${style.bg}`}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate(module.href)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className={`card-body d-flex flex-column align-items-center justify-content-center text-center ${style.text}`}
                >
                  <i
                    className={`${module.icon} display-4 mb-3 ${style.text}`}
                  ></i>
                  <h5 className="card-title">{module.name}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainDashboardPage;
