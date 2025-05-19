import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import CustomerContext from '../context/CustomerContext';
import InventoryContext from '../context/InventoryContext';
import StaffContext from '../context/StaffContext';
import ThemeContext from '../context/ThemeContext';
import Header from '../components/Header';
import '../styles/minimal.css';

const SimpleDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const { customers } = useContext(CustomerContext);
  const { inventoryItems } = useContext(InventoryContext);
  const { staffMembers } = useContext(StaffContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    totalStaff: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleAddCustomer = () => {
    navigate('/customers/add');
  };

  const handleUpdateInventory = () => {
    navigate('/inventory');
  };

  const handleAddStaff = () => {
    navigate('/staff/add');
  };



  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Calculate low stock products
        const lowStockCount = products.filter(product =>
          product.stockQuantity <= product.lowStockThreshold
        ).length;

        // Use actual data from contexts
        setStats({
          totalProducts: products.length,
          lowStockProducts: lowStockCount,
          totalCustomers: customers.length,
          totalStaff: staffMembers.length,
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [products, customers, staffMembers]);

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
      <Header />

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <div>
            <span className="text-muted mr-2">Welcome,</span>
            <span className="font-weight-bold">{user?.username || 'User'}</span>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        <div className="stats-grid">
          <Link to="/products" className="stat-card stat-card-blue">
            <div className="stat-icon">📦</div>
            <div className="stat-title">Total Products</div>
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-link">
              View all products →
            </div>
          </Link>

          <Link to="/products/low-stock" className="stat-card stat-card-red">
            <div className="stat-icon">⚠️</div>
            <div className="stat-title">Low Stock Products</div>
            <div className="stat-value">{stats.lowStockProducts}</div>
            <div className="stat-link">
              View low stock →
            </div>
          </Link>

          <Link to="/customers" className="stat-card stat-card-green">
            <div className="stat-icon">👥</div>
            <div className="stat-title">Total Customers</div>
            <div className="stat-value">{stats.totalCustomers}</div>
            <div className="stat-link">
              View all customers →
            </div>
          </Link>

          {user && user.role === 'admin' && (
            <Link to="/staff" className="stat-card stat-card-purple">
              <div className="stat-icon">👤</div>
              <div className="stat-title">Total Staff</div>
              <div className="stat-value">{stats.totalStaff}</div>
              <div className="stat-link">
                View all staff →
              </div>
            </Link>
          )}
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Activities</h3>
            </div>
            <div className="card-body">
              <p className="text-muted">No recent activities to display.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <button onClick={handleAddProduct} className="quick-action-btn">
                  <span className="quick-action-icon" style={{ color: 'var(--primary-color)' }}>➕</span>
                  <span>Add New Product</span>
                </button>

                <button onClick={handleAddCustomer} className="quick-action-btn">
                  <span className="quick-action-icon" style={{ color: 'var(--success-color)' }}>➕</span>
                  <span>Add New Customer</span>
                </button>

                <button onClick={handleUpdateInventory} className="quick-action-btn">
                  <span className="quick-action-icon" style={{ color: 'var(--warning-color)' }}>🔄</span>
                  <span>Update Inventory</span>
                </button>

                {user && user.role === 'admin' && (
                  <button onClick={handleAddStaff} className="quick-action-btn">
                    <span className="quick-action-icon" style={{ color: '#a855f7' }}>➕</span>
                    <span>Add New Staff</span>
                  </button>
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
