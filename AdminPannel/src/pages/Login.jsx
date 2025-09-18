//  import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserMd, FaLock, FaHospital, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       if (email === "ashaliadmin@gmail.com" && password === "hospital123") {
//         localStorage.setItem("adminToken", "hospital123");
//         navigate("/admin/dashboard");
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     }, 1500);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-6 text-center">
//             <motion.div 
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//               className="flex justify-center mb-4"
//             >
//               <div className="bg-white p-4 rounded-full">
//                 <FaHospital className="text-blue-600 text-4xl" />
//               </div>
//             </motion.div>
//             <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
//             <p className="text-blue-100 mt-2">Ashaali Hospital Management System</p>
//           </div>
          
//           {/* Form Section */}
//           <div className="p-8">
//             <div className="flex items-center justify-center mb-6">
//               <FaShieldAlt className="text-blue-600 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold text-gray-800">Secure Login</h2>
//             </div>
            
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded"
//               >
//                 <p className="text-red-700">{error}</p>
//               </motion.div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUserMd className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   placeholder="Admin Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   required
//                 />
//               </div>
              
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <FaEye className="text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex justify-center items-center shadow-md hover:shadow-lg disabled:opacity-75"
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Authenticating...
//                   </div>
//                 ) : (
//                   "Sign In"
//                 )}
//               </motion.button>
//             </form>
            
//             <div className="mt-8 text-center">
//               <p className="text-sm text-gray-600">
//                 Need assistance? Contact IT Support at{" "}
//                 <a href="mailto:support@ashalihospital.com" className="text-blue-600 hover:underline">
//                   support@ashalihospital.com
//                 </a>
//               </p>
//             </div>
//           </div>
          
//           {/* Footer */}
//           <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
//             <p className="text-xs text-gray-500">
//               © 2023 Ashaali Hospital. All rights reserved. Unauthorized access is prohibited.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaLock,
  FaHospital,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaUserCircle,
  FaKey
} from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === "ashaliadmin@gmail.com" && password === "hospital123") {
        localStorage.setItem("adminToken", "hospital123");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-teal-500/20">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 py-8 px-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <FaHospital className="text-white text-4xl" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-teal-100 mt-2">
              Ashaali Hospital Management System
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-full mr-3">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Secure Login
              </h2>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-gradient-to-r from-red-900/40 to-rose-900/40 border-l-4 border-red-500 p-4 mb-6 rounded-xl backdrop-blur-sm"
              >
                <p className="text-red-200">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserMd className="text-teal-400" />
                </div>
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition text-white placeholder-slate-400"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-teal-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition text-white"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-slate-400 hover:text-teal-400" />
                  ) : (
                    <FaEye className="text-slate-400 hover:text-teal-400" />
                  )}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex justify-center items-center shadow-lg hover:shadow-xl disabled:opacity-75"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </div>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-slate-800/50 px-6 md:px-8 py-4 text-center border-t border-slate-700">
            <p className="text-xs text-slate-400">
              © 2023 Ashaali Hospital. All rights reserved. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;