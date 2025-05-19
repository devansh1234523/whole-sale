import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SimpleInventory = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <Link to="/inventory" className="navbar-link active">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="navbar-link">Staff</Link>
            )}
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Inventory</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to="/inventory/add-transaction"
              className="btn btn-primary"
            >
              Add Transaction
            </Link>
            <Link
              to="/inventory/update"
              className="btn btn-secondary"
              style={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}
            >
              Bulk Update
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Filter by Category
                </label>
                <select
                  id="category"
                  className="form-control"
                >
                  <option value="">All Categories</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stockStatus" className="form-label">
                  Stock Status
                </label>
                <select
                  id="stockStatus"
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>

              <div className="form-group">
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
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Sample Product 1
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    SKU-001
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Massager
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    25
                  </td>
                  <td>
                    <span className="badge badge-success">
                      In Stock
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    2023-05-15
                  </td>
                  <td>
                    <Link to="/inventory/1/transactions" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>Transactions</Link>
                    <Link to="/inventory/1/update" style={{ color: '#6366f1', textDecoration: 'none' }}>Update</Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Sample Product 2
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    SKU-002
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Toys
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    3
                  </td>
                  <td>
                    <span className="badge badge-danger">
                      Low Stock
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    2023-05-20
                  </td>
                  <td>
                    <Link to="/inventory/2/transactions" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>Transactions</Link>
                    <Link to="/inventory/2/update" style={{ color: '#6366f1', textDecoration: 'none' }}>Update</Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    Sample Product 3
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    SKU-003
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    Books
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    0
                  </td>
                  <td>
                    <span className="badge badge-warning">
                      Out of Stock
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>
                    2023-05-10
                  </td>
                  <td>
                    <Link to="/inventory/3/transactions" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '12px' }}>Transactions</Link>
                    <Link to="/inventory/3/update" style={{ color: '#6366f1', textDecoration: 'none' }}>Update</Link>
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

export default SimpleInventory;
