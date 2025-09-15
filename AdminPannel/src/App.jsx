 import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DoctorsAdmin from "./pages/DoctorsAdmin";
import AppointmentsAdmin from "./pages/AppointmentsAdmin";
import BlogsAdmin from "./pages/BlogsAdmin";
import GalleryAdmin from "./pages/GalleryAdmin";
import InquiriesAdmin from "./pages/InquiriesAdmin";
 
const App = () => {
  return (
       <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><DoctorsAdmin /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute><AppointmentsAdmin /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><BlogsAdmin /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><GalleryAdmin /></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute><InquiriesAdmin /></ProtectedRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
   );
};

export default App;
