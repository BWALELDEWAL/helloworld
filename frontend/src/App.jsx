import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/EventList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EventDetails from "./pages/EventDetails";
import ForgotPassword from "./pages/ForgotPassword";
import BookingDetails from "./pages/BookingDetails";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminEventsPage from "./pages/AdminEventsPage"; // ✅ NEW

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <UserBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminEventsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
