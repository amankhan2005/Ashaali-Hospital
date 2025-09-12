import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Ashaali Admin Panel</h1>
      <button
        onClick={() => localStorage.removeItem("adminToken")}
        className="bg-red-500 px-2 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
