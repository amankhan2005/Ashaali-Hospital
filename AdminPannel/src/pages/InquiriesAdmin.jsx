import { useState, useEffect } from "react";
import API from "../api/axios";

const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    const res = await API.get("/api/contact/getall");
    setInquiries(res.data);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    await API.delete(`/api/contact/delete/${id}`);
    fetchInquiries();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Inquiries</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(i => (
              <tr key={i._id} className="text-center">
                <td className="border px-4 py-2">{i.patientName}</td>
                <td className="border px-4 py-2">{i.email}</td>
                <td className="border px-4 py-2">{i.mobileNo}</td>
                <td className="border px-4 py-2">{i.message}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(i._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesAdmin;
