 import { useEffect,useState } from "react";
import API from "../api/axios";

const AppointmentsAdmin = () => {
  const [apps,setApps] = useState([]);
  const fetch=async()=>setApps((await API.get("/api/appointments")).data);
  useEffect(()=>{ fetch(); },[]);

  const updateStatus=async(id,status)=>{ await API.patch(`/api/appointments/${id}`,{status}); fetch(); }
  const del=async(id)=>{ await API.delete(`/api/appointments/${id}`); fetch(); }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Appointments Admin</h2>
      <table className="border w-full"><thead>
        <tr><th>Patient</th><th>Doctor</th><th>Dept</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {apps.map(a=><tr key={a._id}>
          <td>{a.patientName}</td>
          <td>{a.doctorId?.name}</td>
          <td>{a.department}</td>
          <td>{new Date(a.date).toLocaleDateString()}</td>
          <td>{a.time}</td>
          <td>{a.status}</td>
          <td>
            {a.status!=="approved" && <button onClick={()=>updateStatus(a._id,"approved")}>Approve</button>}
            {a.status!=="cancelled" && <button onClick={()=>updateStatus(a._id,"cancelled")}>Cancel</button>}
            <button onClick={()=>del(a._id)}>Delete</button>
          </td>
        </tr>)}
      </tbody></table>
    </div>
  );
}

export default AppointmentsAdmin;
