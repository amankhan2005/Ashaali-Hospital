 import { useEffect, useState } from "react";
import API from "../api/axios";

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/api/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    await API.patch(`/api/appointments/approve/${id}`);
    fetchAppointments();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Patient Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="border px-4 py-2">{app.patientName}</td>
                <td className="border px-4 py-2">{app.email}</td>
                <td className="border px-4 py-2">{app.phone}</td>
                <td className="border px-4 py-2">{app.doctor?.name || "N/A"}</td>
                <td className="border px-4 py-2">{app.department}</td>
                <td className="border px-4 py-2">{new Date(app.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{app.time}</td>
                <td className="border px-4 py-2 capitalize">{app.status}</td>
                <td className="border px-4 py-2">
                  {app.status === "pending" && (
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsAdmin;
