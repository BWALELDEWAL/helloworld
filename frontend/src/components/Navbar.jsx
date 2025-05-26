import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div>
        <Link
          to="/"
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
            <Link to="/bookings">My Bookings</Link>
            {user.role === 'Admin' && (
              <>
                <Link to="/admin/users">Admin Panel</Link>
                <Link to="/admin/events">Events</Link>
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
