 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Agar "/" khola toh login page pe redirect hoga */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route path="/admin/login" element={<Login />} />

        {/* Protected Dashboard with nested routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Agar koi aur galat path daale toh bhi login pe bhejo */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
