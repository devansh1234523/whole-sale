import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SimpleStaff = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fade-in">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">WholesaleFlow</Link>

          <div className="navbar-links">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/products" className="navbar-link">Products</Link>
            <Link to="/customers" className="navbar-link">Customers</Link>
            <Link to="/inventory" className="navbar-link">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="navbar-link active">Staff</Link>
            )}
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Staff Management</h1>
          <Link
            to="/staff/add"
            className="btn btn-primary"
          >
            Add New Staff
          </Link>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  Filter by Department
                </label>
                <select
                  id="department"
                  className="form-control"
                >
                  <option value="">All Departments</option>
                  <option value="Sales">Sales</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="search" className="form-label">
                  Search Staff
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or position"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Michael Johnson
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Sales Manager
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Sales
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    michael.j@example.com
                  </td>
                  <td>
                    <span className="badge badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <div style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '9999px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '85%',
                        backgroundColor: 'var(--success-color)',
                        height: '100%'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>85%</span>
                  </td>
                  <td>
                    <Link to="/staff/1" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>View</Link>
                    <Link to="/staff/1/edit" style={{ color: '#6366f1', textDecoration: 'none', marginRight: '12px' }}>Edit</Link>
                    <button style={{ color: 'var(--danger-color)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '500' }}>Deactivate</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Sarah Williams
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Inventory Specialist
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Inventory
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    sarah.w@example.com
                  </td>
                  <td>
                    <span className="badge badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <div style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '9999px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '92%',
                        backgroundColor: 'var(--success-color)',
                        height: '100%'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>92%</span>
                  </td>
                  <td>
                    <Link to="/staff/2" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>View</Link>
                    <Link to="/staff/2/edit" style={{ color: '#6366f1', textDecoration: 'none', marginRight: '12px' }}>Edit</Link>
                    <button style={{ color: 'var(--danger-color)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '500' }}>Deactivate</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Robert Davis
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Customer Service Rep
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Customer Service
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    robert.d@example.com
                  </td>
                  <td>
                    <span className="badge badge-danger">
                      Inactive
                    </span>
                  </td>
                  <td>
                    <div style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '9999px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '65%',
                        backgroundColor: 'var(--warning-color)',
                        height: '100%'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>65%</span>
                  </td>
                  <td>
                    <Link to="/staff/3" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>View</Link>
                    <Link to="/staff/3/edit" style={{ color: '#6366f1', textDecoration: 'none', marginRight: '12px' }}>Edit</Link>
                    <button style={{ color: 'var(--success-color)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '500' }}>Activate</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStaff;
