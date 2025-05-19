import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleProducts = () => {
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
            <Link to="/products" className="nav-link active">Products</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <Link to="/products/add" className="btn btn-primary">
            Add New Product
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="category" className="form-label">
                  Filter by Category
                </label>
                <select id="category" className="form-control">
                  <option value="">All Categories</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or SKU"
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
                  <th>Product</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sample Product 1</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(58, 123, 213, 0.1)',
                      color: 'var(--primary-color)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Massager
                    </span>
                  </td>
                  <td>SKU-001</td>
                  <td style={{ fontWeight: '500' }}>$99.99</td>
                  <td>
                    <span className="badge badge-success">
                      In Stock (25)
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/products/1" className="action-link">View</Link>
                      <Link to="/products/1/edit" className="action-link edit">Edit</Link>
                      <button className="action-link delete" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sample Product 2</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(0, 194, 168, 0.1)',
                      color: 'var(--accent-color)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Toys
                    </span>
                  </td>
                  <td>SKU-002</td>
                  <td style={{ fontWeight: '500' }}>$49.99</td>
                  <td>
                    <span className="badge badge-warning">
                      Low Stock (3)
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/products/2" className="action-link">View</Link>
                      <Link to="/products/2/edit" className="action-link edit">Edit</Link>
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

export default SimpleProducts;
