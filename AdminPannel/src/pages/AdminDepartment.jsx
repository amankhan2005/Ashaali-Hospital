import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDepartment = () => {
  const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:3000/api
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDeptId, setEditDeptId] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/departments`);
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add new department
  const handleAdd = async () => {
    if (!newDept.trim()) return toast.error("Department name required");
    try {
      const res = await axios.post(`${API_URL}/api/departments`, { name: newDept });
      setDepartments([res.data.data, ...departments]);
      setNewDept("");
      toast.success("Department added");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Add failed");
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`${API_URL}/api/departments/${id}`);
      setDepartments(departments.filter(d => d._id !== id));
      toast.success("Department deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Start editing
  const handleEditStart = (dept) => {
    setEditDeptId(dept._id);
    setEditDeptName(dept.name);
  };

  // Save edit
  const handleEditSave = async () => {
    if (!editDeptName.trim()) return toast.error("Name required");
    try {
      const res = await axios.put(`${API_URL}/api/departments/${editDeptId}`, { name: editDeptName });
      setDepartments(departments.map(d => (d._id === editDeptId ? res.data.data : d)));
      setEditDeptId(null);
      setEditDeptName("");
      toast.success("Department updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Departments</h2>

      {/* Add Department */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="New Department Name"
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Add
        </button>
      </div>

      {/* Department List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept._id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {editDeptId === dept._id ? (
                  <input
                    type="text"
                    value={editDeptName}
                    onChange={(e) => setEditDeptName(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  dept.name
                )}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-2">
                {editDeptId === dept._id ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditDeptId(null)}
                      className="bg-gray-400 text-white px-3 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(dept)}
                      className="bg-yellow-400 text-white px-3 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept._id)}
                      className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500">
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDepartment;
