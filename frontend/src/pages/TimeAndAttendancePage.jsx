import React from "react";
import { useLocation } from "react-router-dom";

// Map routes to page content
const pageContent = {
  "/payroll-processing": {
    title: "Payroll Processing",
    description:
      "Automated payroll calculations, tax compliance, and payment processing",
    emoji: "💰",
  },
  "/benefits-administration": {
    title: "Benefits Administration",
    description:
      "Comprehensive benefits management, enrollment, and compliance tracking",
    emoji: "🏥",
  },
  "/performance-management": {
    title: "Performance Management",
    description:
      "Employee performance tracking, reviews, and development planning",
    emoji: "📊",
  },
  "/recruitment-pipeline": {
    title: "Recruitment Pipeline",
    description:
      "Streamlined hiring process from applicant tracking to onboarding",
    emoji: "👥",
  },
  "/training-and-development": {
    title: "Training & Development",
    description:
      "Employee training programs, skill development, and career growth planning",
    emoji: "🎓",
  },
  // Default fallback (original content)
  "/time-and-attendance": {
    title: "Time & Attendance",
    description:
      "Advanced time tracking, shift management, and attendance analytics",
    emoji: "🕒",
  },
};

function getPageContent(pathName) {
  return pageContent[pathName] || pageContent["/time-and-attendance"];
}

const TimeAndAttendancePage = () => {
  const location = useLocation();
  const content = getPageContent(location.pathname);

  return (
    <div className="text-center py-5">
      <div className="display-1 mb-4">{content.emoji}</div>
      <h1 className="display-4 fw-bold text-primary mb-3">{content.title}</h1>
      <p className="lead text-muted mb-4">{content.description}</p>
      <div className="alert alert-warning">
        <i className="bi bi-tools me-2"></i>
        <strong>Under Development:</strong> This module is currently being built
      </div>
      {/* Add feature preview and contribution call-to-action */}
      <a href="https://github.com/omaraldawud/mern-mini-erp">
        <button className="btn btn-primary btn-lg">
          <i className="bi bi-github me-2"></i>
          Contribute on GitHub
        </button>
      </a>
    </div>
  );
};

export default TimeAndAttendancePage;
