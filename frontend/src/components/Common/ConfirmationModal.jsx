import React from "react";

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes, Continue",
  cancelText = "Cancel",
  variant = "danger", // danger, warning, primary, etc.
}) => {
  if (!show) return null;

  const getVariantClass = () => {
    switch (variant) {
      case "warning":
        return "btn-warning";
      case "primary":
        return "btn-primary";
      case "success":
        return "btn-success";
      default:
        return "btn-danger";
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i
                className={`bi bi-exclamation-triangle text-${variant} me-2`}
              ></i>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn ${getVariantClass()}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
