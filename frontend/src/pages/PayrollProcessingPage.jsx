import React from "react";

const PayrollProcessingPage = () => {
  return (
    <div className="text-center py-5">
      <div className="display-1 mb-4">🕒</div>
      <h1 className="display-4 fw-bold text-primary mb-3">Time & Attendance</h1>
      <p className="lead text-muted mb-4">
        Advanced time tracking, shift management, and attendance analytics
      </p>
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

export default PayrollProcessingPage;
