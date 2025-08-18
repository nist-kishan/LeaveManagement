import React, { useEffect, useState } from 'react';

export default function LeaveRequests(){
  const [list, setList] = useState([]);
  const BASE = import.meta.env.VITE_API_BASE;
  const fetchAll = async ()=> {
    try {
      const res = await fetch(`${BASE}/leaves`);
      const data = await res.json();
      setList(data);
    } catch(e){ console.error(e); }
  };
  useEffect(()=> { fetchAll(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE}/leaves/${id}/status`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ status })
      });
      if(!res.ok) {
        const err = await res.json();
        alert(err.message);
      } else {
        fetchAll();
      }
    } catch(e){ alert(e.message); }
  };

  return (
    <div>
      <h3>All Leave Requests</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Employee</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(l=>(
            <tr key={l._id}>
              <td>{l.employee?.name || '—'}</td>
              <td>{new Date(l.startDate).toLocaleDateString()}</td>
              <td>{new Date(l.endDate).toLocaleDateString()}</td>
              <td>{l.days}</td>
              <td>{l.status}</td>
              <td>
                {l.status === 'Pending' && <>
                  <button onClick={()=>updateStatus(l._id,'Approved')}>Approve</button>
                  <button onClick={()=>updateStatus(l._id,'Rejected')}>Reject</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
