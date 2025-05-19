import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="brand">WholesaleFlow</Link>

        <nav className="nav">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/products" className={`nav-link ${isActive('/products')}`}>Products</Link>
          <Link to="/customers" className={`nav-link ${isActive('/customers')}`}>Customers</Link>
          <Link to="/inventory" className={`nav-link ${isActive('/inventory')}`}>Inventory</Link>
          {user && user.role === 'admin' && (
            <Link to="/staff" className={`nav-link ${isActive('/staff')}`}>Staff</Link>
          )}
          <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          <div className="nav-link theme-toggle-container">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
