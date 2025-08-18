import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "./ApplyLeave.css";

export default function ApplyLeave({ onSubmit }) {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const BASE = import.meta.env.VITE_API_BASE;

  const [form, setForm] = useState({
    name: "",
    reason: "",
    fromDate: "",
    toDate: "",
  });
  const [message, setMessage] = useState("");

  // Fetch employees once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE}/employees`);
        const data = await res.json();
        setEmployees(data);
        setFiltered(data);
      } catch (e) {
        console.error(e);
        setMessage("Could not load employees.");
      }
    })();
  }, []);

  // Currently selected employee (by typed name)
  const selectedEmp = useMemo(() => {
    const n = form.name.trim().toLowerCase();
    return employees.find((e) => e.name.trim().toLowerCase() === n);
  }, [employees, form.name]);

  // Join date ISO for input[min]
  const joinDateISO = useMemo(() => {
    if (!selectedEmp?.joiningDate) return "";
    const d = new Date(selectedEmp.joiningDate);
    const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      .toISOString()
      .slice(0, 10);
    return iso;
  }, [selectedEmp]);

  // Filter names as user types
  const handleNameChange = (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, name: value }));
    setShowDropdown(true);

    const v = value.trim().toLowerCase();
    const next = employees.filter((emp) =>
      emp.name.toLowerCase().includes(v)
    );
    setFiltered(next);
  };

  const handleSelectName = (emp) => {
    setForm((f) => ({
      ...f,
      name: emp.name,
      // If user had picked a start date earlier than join date, fix it
      fromDate:
        f.fromDate && joinDateISO && f.fromDate < joinDateISO
          ? joinDateISO
          : f.fromDate,
    }));
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Keep date range valid (toDate >= fromDate)
    if (name === "fromDate") {
      setForm((f) => ({
        ...f,
        fromDate: value,
        toDate: f.toDate && f.toDate < value ? value : f.toDate,
      }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Basic validations
    if (!form.name || !form.reason || !form.fromDate || !form.toDate) {
      setMessage("Missing fields");
      return;
    }
    if (!selectedEmp) {
      setMessage("❌ Employee not found!");
      return;
    }
    if (form.toDate < form.fromDate) {
      setMessage("❌ End date cannot be before start date.");
      return;
    }
    const start = new Date(form.fromDate);
    const join = new Date(selectedEmp.joiningDate);
    if (start < join) {
      setMessage(
        `❌ ${selectedEmp.name} cannot apply leave before joining date (${selectedEmp.joiningDate.slice(
          0,
          10
        )}).`
      );
      return;
    }

    // ✅ Send what the backend expects
    const payload = {
  employeeId: selectedEmp._id,   // fixed key
  startDate: form.fromDate,
  endDate: form.toDate,
  reason: form.reason,
};

    try {
      const res = await fetch(`${BASE}/leaves`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err.message || "Error applying leave.");
        return;
      }

      setMessage("✅ Leave applied successfully (Pending Approval).");
      setForm({ name: "", reason: "", fromDate: "", toDate: "" });
      setShowDropdown(false);
      onSubmit && onSubmit();
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <motion.div
      className="apply-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="apply-title">📅 Apply for Leave</h2>

      <form className="apply-form" onSubmit={handleSubmit}>
        {/* Searchable employee dropdown */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleNameChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Search employee…"
            className="apply-input"
            autoComplete="off"
            required
          />
          {showDropdown && form.name && filtered.length > 0 && (
            <ul
              className="absolute z-20 bg-white border rounded-md shadow-md max-h-44 overflow-y-auto w-full"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {filtered.map((emp) => (
                <li
                  key={emp._id}
                  onMouseDown={(e) => e.preventDefault()} // keep focus
                  onClick={() => handleSelectName(emp)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {emp.name}{" "}
                  <span className="text-gray-500 text-sm">
                    ({emp.department})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <motion.input
          type="text"
          name="reason"
          placeholder="Reason for leave"
          value={form.reason}
          onChange={handleChange}
          className="apply-input"
          required
        />

        <label>From:</label>
        <motion.input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
          className="apply-input"
          min={joinDateISO || undefined}
          required
        />

        <label>To:</label>
        <motion.input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
          className="apply-input"
          min={form.fromDate || joinDateISO || undefined}
          required
        />

        <motion.button
          type="submit"
          className="apply-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Submit Leave
        </motion.button>
      </form>

      {message && (
        <motion.div
          className="apply-msg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
}
