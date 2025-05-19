import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleCustomers = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fade-in">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="brand">WholesaleFlow</Link>

          <nav className="nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/customers" className="nav-link active">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Customers</h1>
          <Link to="/customers/add" className="btn btn-primary">
            Add New Customer
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="segment" className="form-label">
                  Filter by Segment
                </label>
                <select id="segment" className="form-control">
                  <option value="">All Segments</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="distributor">Distributor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Customers
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, email, or company"
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
                  <th>Email</th>
                  <th>Company</th>
                  <th>Segment</th>
                  <th>Total Spent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500' }}>John Smith</td>
                  <td>john.smith@example.com</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      ABC Retail
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      Retail
                    </span>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--success-color)' }}>
                    $5,250.00
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/customers/1" className="action-link">View</Link>
                      <Link to="/customers/1/edit" className="action-link edit">Edit</Link>
                      <button className="action-link delete" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Jane Doe</td>
                  <td>jane.doe@example.com</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      XYZ Distributors
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">
                      Distributor
                    </span>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--success-color)' }}>
                    $12,750.00
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/customers/2" className="action-link">View</Link>
                      <Link to="/customers/2/edit" className="action-link edit">Edit</Link>
                      <button className="action-link delete" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Delete</button>
                    </div>
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

export default SimpleCustomers;
