import React from 'react';
import './EmployeeList.css';  // ✅ make sure CSS is updated

export default function EmployeeList({ employees, onRefresh }) {
  const BASE = import.meta.env.VITE_API_BASE;
  const fetchBalance = async (id) => {
    try {
      const res = await fetch(`${BASE}/api/employees/${id}/balance`);
      const data = await res.json();
      alert(`Leave balance: ${data.leaveBalance}`);
    } catch (e) { 
      alert(e.message); 
    }
  };

  return (
    <div className="employee-list">
      <h3 className="title">Employees</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id} className="table-row">
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
              <td>
                <button 
                  className="balance-btn" 
                  onClick={() => fetchBalance(emp._id)}
                >
                  💼 Get
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
