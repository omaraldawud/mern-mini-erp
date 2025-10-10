// src/pages/SCMPlaceholderPage.jsx
import React from "react";

const SCMPlaceholderPage = ({ name }) => {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">{name}</h1>
      <p className="text-muted">
        This is a placeholder page for the SCM module.
      </p>
    </div>
  );
};

export default SCMPlaceholderPage;
