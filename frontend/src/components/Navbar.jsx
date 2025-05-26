import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div>
        <Link
          to={user && user.role === "Organizer" ? "/organizer" : "/"}
          style={{
            fontWeight: 700,
            fontSize: '1.3rem',
            letterSpacing: '1px',
          }}
        >
          Eventify
        </Link>
      </div>

      {/* Right: Navigation Links */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-name">Welcome, {user.name}!</span>
            <Link to="/profile">Profile</Link>

            {/* Show bookings only for Users */}
            {user.role === "User" && (
              <Link to="/bookings">My Bookings</Link>
            )}

            {/* Admin-specific links */}
            {user.role === "Admin" && (
              <>
                <Link to="/admin/users">Admin Users</Link>
                <Link to="/admin/events">Admin Events</Link>
              </>
            )}

            <button className="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
