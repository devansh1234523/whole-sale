import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import InventoryContext from '../context/InventoryContext';
import '../styles/minimal.css';

const SimpleInventory = () => {
  const { user, logout } = useContext(AuthContext);
  const { inventoryItems } = useContext(InventoryContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: '',
    stockStatus: '',
    search: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  // Filter inventory items based on filter criteria
  const filteredInventory = inventoryItems.filter(item => {
    // Filter by category
    if (filter.category && item.product.category !== filter.category) {
      return false;
    }

    // Filter by stock status
    if (filter.stockStatus) {
      if (filter.stockStatus === 'inStock' && item.quantity <= 5) {
        return false;
      }
      if (filter.stockStatus === 'lowStock' && (item.quantity === 0 || item.quantity > 5)) {
        return false;
      }
      if (filter.stockStatus === 'outOfStock' && item.quantity > 0) {
        return false;
      }
    }

    // Filter by search term
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      return (
        item.product.name.toLowerCase().includes(searchTerm) ||
        item.product.sku.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });

  return (
    <div className="fade-in">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="brand">WholesaleFlow</Link>

          <nav className="nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link active">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="nav-link">Staff</Link>
            )}
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Inventory</h1>
          <div>
            <Link to="/inventory/add-transaction" className="btn btn-primary mr-2">
              Add Transaction
            </Link>
            <Link to="/inventory/update" className="btn btn-secondary">
              Bulk Update
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="category" className="form-label">
                  Filter by Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={filter.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="stockStatus" className="form-label">
                  Stock Status
                </label>
                <select
                  id="stockStatus"
                  name="stockStatus"
                  className="form-control"
                  value={filter.stockStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search by name or SKU"
                  className="form-control"
                  value={filter.search}
                  onChange={handleFilterChange}
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
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">No inventory items found matching your criteria</td>
                  </tr>
                ) : (
                  filteredInventory.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: '500' }}>{item.product.name}</td>
                      <td>{item.product.sku}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          color: 'var(--text-medium)',
                          fontWeight: '500'
                        }}>
                          {item.product.category}
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.quantity === 0 ? (
                          <span className="badge badge-danger">
                            Out of Stock
                          </span>
                        ) : item.quantity <= 5 ? (
                          <span className="badge badge-warning">
                            Low Stock
                          </span>
                        ) : (
                          <span className="badge badge-success">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/inventory/${item.id}`} className="action-link">View</Link>
                          <Link to={`/inventory/${item.id}/update`} className="action-link edit">Update</Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventory;
