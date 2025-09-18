// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className=" bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4 flex justify-between items-center">
//       <h1 className=" font-bold text-lg">Ashaali Admin Panel</h1>
//       <button
//         onClick={() => localStorage.removeItem("adminToken")}
//         className=" bg-teal-500 px-2 py-1 rounded"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

  import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token remove karo
    localStorage.removeItem("adminToken");

    // Redirect to admin login page
    navigate("/admin/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Ashaali Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-teal-500 px-3 py-1 rounded hover:bg-teal-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
