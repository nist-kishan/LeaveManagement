import React, { useEffect, useState } from 'react';

export default function RejectedLeaves() {
  const [leaves, setLeaves] = useState([]);
  const BASE = import.meta.env.VITE_API_BASE;

  const fetchRejected = async () => {
    try {
      const res = await fetch(`${BASE}/leaves/rejected`);
      const data = await res.json();
      setLeaves(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchRejected(); }, []);

  return (
    <div>
      <h2>Rejected Leaves</h2>
      <ul>
        {leaves.map(l => (
          <li key={l._id}>
            {l.employeeName} – {l.startDate} to {l.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
