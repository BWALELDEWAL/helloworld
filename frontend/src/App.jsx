import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/EventList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EventDetails from "./pages/EventDetails";
import ForgotPassword from "./pages/ForgotPassword";
import BookingDetails from "./pages/BookingDetails"; // <-- Import the BookingDetails page

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
          path="/bookings"
          element={
            <ProtectedRoute>
              <UserBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:bookingId"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
