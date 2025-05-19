import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const SimpleDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    totalStaff: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would have an endpoint to fetch all stats at once
        // For now, we'll simulate it with separate requests or mock data

        // Mock data for demonstration
        setStats({
          totalProducts: 25,
          lowStockProducts: 3,
          totalCustomers: 42,
          totalStaff: 8,
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid var(--primary-color)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">WholesaleFlow</Link>

          <div className="navbar-links">
            <Link to="/dashboard" className="navbar-link active">Dashboard</Link>
            <Link to="/products" className="navbar-link">Products</Link>
            <Link to="/customers" className="navbar-link">Customers</Link>
            <Link to="/inventory" className="navbar-link">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="navbar-link">Staff</Link>
            )}
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
          <div>
            <span style={{ color: 'var(--text-light)', marginRight: '0.5rem' }}>Welcome,</span>
            <span style={{ fontWeight: '600' }}>{user?.username || 'User'}</span>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div className="stat-card stat-card-blue">
            <div className="stat-icon">📦</div>
            <div className="stat-title">Total Products</div>
            <div className="stat-value">{stats.totalProducts}</div>
            <Link to="/products" className="stat-link">
              View all products →
            </Link>
          </div>

          <div className="stat-card stat-card-red">
            <div className="stat-icon">⚠️</div>
            <div className="stat-title">Low Stock Products</div>
            <div className="stat-value">{stats.lowStockProducts}</div>
            <Link to="/products/low-stock" className="stat-link">
              View low stock →
            </Link>
          </div>

          <div className="stat-card stat-card-green">
            <div className="stat-icon">👥</div>
            <div className="stat-title">Total Customers</div>
            <div className="stat-value">{stats.totalCustomers}</div>
            <Link to="/customers" className="stat-link">
              View all customers →
            </Link>
          </div>

          {user && user.role === 'admin' && (
            <div className="stat-card stat-card-purple">
              <div className="stat-icon">👤</div>
              <div className="stat-title">Total Staff</div>
              <div className="stat-value">{stats.totalStaff}</div>
              <Link to="/staff" className="stat-link">
                View all staff →
              </Link>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px'
        }}>
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>Recent Activities</h3>
            </div>
            <div className="card-body">
              <p style={{ color: 'var(--text-light)' }}>No recent activities to display.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/products/add" className="btn btn-secondary text-left d-flex align-items-center">
                  <span style={{ color: 'var(--primary-color)', marginRight: '10px', fontSize: '1.25rem' }}>➕</span>
                  <span>Add New Product</span>
                </Link>

                <Link to="/customers/add" className="btn btn-secondary text-left d-flex align-items-center">
                  <span style={{ color: 'var(--success-color)', marginRight: '10px', fontSize: '1.25rem' }}>➕</span>
                  <span>Add New Customer</span>
                </Link>

                <Link to="/inventory/update" className="btn btn-secondary text-left d-flex align-items-center">
                  <span style={{ color: 'var(--warning-color)', marginRight: '10px', fontSize: '1.25rem' }}>🔄</span>
                  <span>Update Inventory</span>
                </Link>

                {user && user.role === 'admin' && (
                  <Link to="/staff/add" className="btn btn-secondary text-left d-flex align-items-center">
                    <span style={{ color: '#a855f7', marginRight: '10px', fontSize: '1.25rem' }}>➕</span>
                    <span>Add New Staff</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
