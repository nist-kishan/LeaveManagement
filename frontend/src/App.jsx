import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import ApplyLeave from "./components/ApplyLeave";
import LeaveRequests from "./components/LeaveRequests";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const BASE = import.meta.env.VITE_API_BASE;

  const refresh = async () => {
    try {
      const res = await fetch(`${BASE}/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Router>
      {/* ❌ Remove Navbar here because LandingPage already includes Navbar */}
      <div style={{ padding: 20 }}>
        <Routes>
          {/* ✅ Use LandingPage instead of <h1> */}
          <Route path="/" element={<LandingPage />} />
          
          <Route
            path="/employees"
            element={
              <div>
                <Navbar /> {/* ✅ Add Navbar for non-landing pages */}
                <AddEmployee onAdded={refresh} />
                <EmployeeList employees={employees} onRefresh={refresh} />
              </div>
            }
          />
          <Route
            path="/leave"
            element={
              <div>
                <Navbar />
                <ApplyLeave employees={employees} onApplied={() => {}} />
              </div>
            }
          />
          <Route
            path="/requests"
            element={
              <div>
                <Navbar />
                <LeaveRequests />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
