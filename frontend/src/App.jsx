// App.jsx
import "../src/assets/css/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import WorkforceAnalyticsPage from "./pages/WorkforceAnalyticsPage";
import TimeAndAttendancePage from "./pages/TimeAndAttendancePage";
import PayrollProcessingPage from "./pages/PayrollProcessingPage";

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-grow-1 p-4 bg-light">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route
                path="/workforce-analytics"
                element={<WorkforceAnalyticsPage />}
              />
              <Route
                path="/time-and-attendance"
                element={<TimeAndAttendancePage />}
              />

              <Route
                path="/payroll-processing"
                element={<TimeAndAttendancePage />}
              />
              <Route
                path="/benefits-administration"
                element={<TimeAndAttendancePage />}
              />
              <Route
                path="/performance-management"
                element={<TimeAndAttendancePage />}
              />

              <Route
                path="/recruitment-pipeline"
                element={<TimeAndAttendancePage />}
              />

              <Route
                path="/training-and-development"
                element={<TimeAndAttendancePage />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
