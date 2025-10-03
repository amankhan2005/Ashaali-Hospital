import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Building2,
  SquarePen,
  Plus,
  Trash2,
  Save,
  X,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const AdminDepartment = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDeptId, setEditDeptId] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  // Fetch
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

  // Add
  const handleAdd = async () => {
    if (!newDept.trim()) return toast.error("Department name required");

    // Check for duplicate department (case insensitive)
    const isDuplicate = departments.some(
      (dept) => dept.name.toLowerCase() === newDept.trim().toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateMessage(
        `"${newDept.trim()}" already exists in the department list.`
      );
      setShowDuplicateAlert(true);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/departments`, {
        name: newDept,
      });
      setDepartments([res.data.data, ...departments]);
      setNewDept("");
      setShowAddModal(false);
      toast.success("Department added");
    } catch (err) {
      console.error(err);
      toast.error("Add failed");
    }
  };

  // Delete
  const confirmDelete = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/departments/${deleteTarget}`);
      setDepartments(departments.filter((d) => d._id !== deleteTarget));
      setShowDeleteModal(false);
      toast.success("Department deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Edit start
  const handleEditStart = (dept) => {
    setEditDeptId(dept._id);
    setEditDeptName(dept.name);
  };

  // Edit save
  const handleEditSave = async () => {
    if (!editDeptName.trim()) return toast.error("Name required");

    // Check for duplicate department (case insensitive), excluding the current department being edited
    const isDuplicate = departments.some(
      (dept) =>
        dept._id !== editDeptId &&
        dept.name.toLowerCase() === editDeptName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateMessage(
        `"${editDeptName.trim()}" already exists in the department list.`
      );
      setShowDuplicateAlert(true);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/api/departments/${editDeptId}`, {
        name: editDeptName,
      });
      setDepartments(
        departments.map((d) => (d._id === editDeptId ? res.data.data : d))
      );
      setEditDeptId(null);
      setEditDeptName("");
      toast.success("Department updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Handle Enter key for edit input
  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };

  // Handle Enter key for add modal
  const handleAddKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Department Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus size={18} /> Add Department
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept._id}
            className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-teal-200"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-3 rounded-xl shadow-sm">
                <Building2 size={24} className="text-white" />
              </div>
              {editDeptId === dept._id ? (
                <input
                  type="text"
                  value={editDeptName}
                  onChange={(e) => setEditDeptName(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  autoFocus
                />
              ) : (
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    {dept.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ID: {dept._id}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {editDeptId === dept._id ? (
                <>
                  <button
                    onClick={handleEditSave}
                    className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                    title="Save"
                  >
                    <Save size={18} />
                  </button>
                  <button
                    onClick={() => setEditDeptId(null)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditStart(dept)}
                    className="p-2 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors"
                    title="Edit"
                  >
                    <SquarePen size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(dept._id)}
                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {departments.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-2">No departments found</div>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Create your first department
            </button>
          </div>
        )}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[11000] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Department
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewDept("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                onKeyDown={handleAddKeyDown}
                placeholder="Enter department name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewDept("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[11000] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 size={24} className="text-red-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Delete Department
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this department? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Alert Modal */}
      {showDuplicateAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[11000] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle size={24} className="text-yellow-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Duplicate Department
            </h2>
            <p className="text-gray-600 text-center mb-6">{duplicateMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowDuplicateAlert(false)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="container flex justify-center fixed bottom-0 left-0 text-white ">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDepartment;
