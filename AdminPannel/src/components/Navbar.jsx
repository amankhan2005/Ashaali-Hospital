import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dontAsk, setDontAsk] = useState(false);

  const startLogout = () => {
    setShowModal(false);
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("adminToken");
      setLoading(false);
      navigate("/", { replace: true });
    }, 2000);
  };

  const handleLogout = () => {
    if (dontAsk) {
      startLogout();
    } else {
      setShowModal(true);
    }
  };

  return (
    <nav className="bg-teal-700 shadow-lg px-6 sm:px-8 py-4 flex justify-between items-center w-full">
      
      {/* Branding */}
      <div className="flex px-15 md:px-0 items-center space-x-4">
        <h1 className="font-bold text-white text-xl sm:text-2xl md:text-3xl tracking-wide">
          Ashaali Hospital
        </h1>
      </div>

      {/* Profile Menu */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-2 text-white"
        >
          <FaUserCircle className="h-9 w-9 text-white" />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-20">
            <div className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm font-semibold">
              👤 Admin
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 text-red-600 font-medium hover:bg-red-50 px-4 py-2 text-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Top Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-1 bg-orange-500 animate-[progress_2s_linear_forwards]"></div>
        </div>
      )}

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0   backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>

            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="dontAsk"
                checked={dontAsk}
                onChange={() => setDontAsk(!dontAsk)}
                className="mr-2"
              />
              <label htmlFor="dontAsk" className="text-sm text-gray-600">
                Don’t ask me again
              </label>
            </div>

            <div className="flex justify-between space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
