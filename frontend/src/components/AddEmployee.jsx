import React, { useState, useEffect } from "react";
import "./AddEmployee.css";

export default function AddEmployee({ onAdded, onDeleted }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    joiningDate: "",
  });
  const [msg, setMsg] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const BASE = import.meta.env.VITE_API_BASE;

  // ✅ Fetch employees for delete dropdown
  async function fetchEmployees() {
    try {
      const res = await fetch(`${BASE}/api/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Add Employee
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        setMsg(err.message || "Error");
      } else {
        setMsg("✅ Employee added successfully!");
        setForm({ name: "", email: "", department: "", joiningDate: "" });
        fetchEmployees(); // refresh dropdown
        onAdded && onAdded();
      }
    } catch (err) {
      setMsg(err.message);
    }
  }

  // ✅ Delete Employee
  async function handleDelete() {
    if (!selectedEmp) {
      setMsg("⚠️ Please select an employee to delete");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const res = await fetch(`${BASE}/api/employees/${selectedEmp}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        setMsg(err.message || "Error deleting employee");
      } else {
        setMsg("🗑️ Employee deleted successfully!");
        setSelectedEmp("");
        fetchEmployees(); // refresh dropdown
        onDeleted && onDeleted();
      }
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="employee-form-container">
      <h2 className="form-title">➕ Add New Employee</h2>
      <form onSubmit={submit} className="employee-form">
        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          required
          type="date"
          value={form.joiningDate}
          onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
        />
        <button type="submit" className="submit-btn">
          🚀 Add Employee
        </button>
      </form>

      {/* ✅ Delete Section */}
      <div className="delete-section">
        <h3 className="form-title">🗑️ Delete Employee</h3>
        <select
          value={selectedEmp}
          onChange={(e) => setSelectedEmp(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.department})
            </option>
          ))}
        </select>
        <button onClick={handleDelete} className="delete-btn">
          ❌ Delete
        </button>
      </div>

      {msg && <p className="form-msg">{msg}</p>}
    </div>
  );
}
