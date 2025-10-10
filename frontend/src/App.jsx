import "../src/assets/css/App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/shared/Navbar";
import Sidebar from "./components/Layout/shared/Sidebar";
// pages
import EmployeesPage from "./pages/hcm/EmployeesPage";
import DepartmentsPage from "./pages/hcm/DepartmentsPage";
import WorkforceAnalyticsPage from "./pages/hcm/WorkforceAnalyticsPage";
import TimeAndAttendancePage from "./pages/hcm/TimeAndAttendancePage";
import SCMPlaceholderPage from "./pages/scm/SCMPlaceholderPage";
// dashboards
import MainDashboardPage from "./pages/MainDashBoardPage";
import DashboardPage from "./pages/hcm/HCMDashboardPage";

// React Utils
import { getModuleFromPath } from "../reactUtils/getModuleFromPath";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// const location = useLocation();
// const activeModule = getModuleFromPath(location.pathname);
// console.log(location.pathname, activeModule); // debug
// separate component to use hooks inside Router
const AppContent = () => {
  const location = useLocation();
  const activeModule = getModuleFromPath(location.pathname);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar module={activeModule} />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <Navbar currentModule={activeModule} />

        {/* Page Content */}
        <main className="flex-grow-1 p-4 bg-light">
          {/* prettier-ignore-start */}
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<MainDashboardPage />} />

            {/* HCM Dashboard */}
            <Route path="/" element={<DashboardPage />} />

            {/* HCM Routes */}
            <Route path="/hcm" element={<DashboardPage />} />
            <Route path="/hcm/employees" element={<EmployeesPage />} />
            <Route path="/hcm/departments" element={<DepartmentsPage />} />
            <Route
              path="/hcm/workforce-analytics"
              element={<WorkforceAnalyticsPage />}
            />
            <Route
              path="/hcm/time-and-attendance"
              element={<TimeAndAttendancePage />}
            />
            <Route
              path="/hcm/payroll-processing"
              element={<TimeAndAttendancePage />}
            />
            <Route
              path="/hcm/benefits-administration"
              element={<TimeAndAttendancePage />}
            />
            <Route
              path="/hcm/performance-management"
              element={<TimeAndAttendancePage />}
            />
            <Route
              path="/hcm/recruitment-pipeline"
              element={<TimeAndAttendancePage />}
            />
            <Route
              path="/hcm/training-and-development"
              element={<TimeAndAttendancePage />}
            />

            {/* SCM Routes */}
            <Route
              path="/scm"
              element={<SCMPlaceholderPage name="SCM Dashboard" />}
            />
            <Route
              path="/scm/suppliers"
              element={<SCMPlaceholderPage name="Suppliers" />}
            />
            <Route
              path="/scm/purchase-orders"
              element={<SCMPlaceholderPage name="Purchase Orders" />}
            />
            <Route
              path="/scm/inventory"
              element={<SCMPlaceholderPage name="Inventory" />}
            />
            <Route
              path="/scm/warehouses"
              element={<SCMPlaceholderPage name="Warehouses" />}
            />
            <Route
              path="/scm/shipments"
              element={<SCMPlaceholderPage name="Shipments" />}
            />
            <Route
              path="/scm/procurement-analytics"
              element={<SCMPlaceholderPage name="Procurement Analytics" />}
            />

            {/* Finance Routes */}
            <Route path="/finance" element={<DashboardPage />} />
            <Route
              path="/finance/invoices"
              element={<SCMPlaceholderPage name="Invoices" />}
            />
            <Route
              path="/finance/payments"
              element={<SCMPlaceholderPage name="Payments" />}
            />
          </Routes>
          {/* prettier-ignore-end */}
        </main>
      </div>
    </div>
  );
};

export default App;
