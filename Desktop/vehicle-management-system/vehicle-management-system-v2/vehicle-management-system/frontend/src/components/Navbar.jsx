import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>🚗</span>
        <span>VehicleMS</span>
      </div>
      <div className="navbar-links">
        {user?.role === 'ADMIN' && (
          <Link to="/admin" className="nav-link">🛡️ Admin</Link>
        )}
        {user?.role === 'USER' && (
          <Link to="/catalogue" className="nav-link">📋 Catalogue</Link>
        )}
      </div>
      <div className="navbar-user">
        <span className={`role-badge ${user?.role?.toLowerCase()}`}>
          {user?.role === 'ADMIN' ? '🛡️' : '👤'} {user?.username}
        </span>
        <button className="btn btn-outline-sm" onClick={handleLogout}>Déconnexion</button>
      </div>
    </nav>
  );
}
