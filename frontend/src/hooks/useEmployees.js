import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">MercuryERP</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">HR Management System</div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
