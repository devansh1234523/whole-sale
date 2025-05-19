import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import InventoryContext from '../context/InventoryContext';
import ProductContext from '../context/ProductContext';
import { convertAndFormatINR } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleInventoryBulkUpdate = () => {
  const { user, logout } = useContext(AuthContext);
  const { inventoryItems, updateInventory } = useContext(InventoryContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkQuantity, setBulkQuantity] = useState('');
  const [bulkLocation, setBulkLocation] = useState({
    warehouse: '',
    section: '',
    shelf: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(inventoryItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkActionChange = (e) => {
    setBulkAction(e.target.value);
  };

  const handleBulkQuantityChange = (e) => {
    setBulkQuantity(e.target.value);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setBulkLocation({
      ...bulkLocation,
      [name.replace('location.', '')]: value
    });
  };

  const validateForm = () => {
    if (selectedItems.length === 0) {
      setErrorMessage('Please select at least one inventory item');
      return false;
    }

    if (!bulkAction) {
      setErrorMessage('Please select an action');
      return false;
    }

    if (bulkAction === 'updateQuantity' && (!bulkQuantity || isNaN(parseInt(bulkQuantity)))) {
      setErrorMessage('Please enter a valid quantity');
      return false;
    }

    if (bulkAction === 'updateLocation' &&
        (!bulkLocation.warehouse || !bulkLocation.section || !bulkLocation.shelf)) {
      setErrorMessage('Please fill in all location fields');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Process each selected item
        for (const itemId of selectedItems) {
          const inventoryItem = inventoryItems.find(item => item.id === itemId);

          if (inventoryItem) {
            let updatedItem = { ...inventoryItem };

            if (bulkAction === 'updateQuantity') {
              updatedItem.quantity = parseInt(bulkQuantity);
            } else if (bulkAction === 'updateLocation') {
              updatedItem.location = { ...bulkLocation };
            }

            // Update the inventory item
            updateInventory(updatedItem);
          }
        }

        // Show success message
        setSuccessMessage(`Successfully updated ${selectedItems.length} inventory items`);

        // Reset form after 2 seconds and redirect
        setTimeout(() => {
          navigate('/inventory');
        }, 2000);
      } catch (error) {
        console.error('Error updating inventory items:', error);
        setErrorMessage('An error occurred while updating inventory items');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
          <h1 className="page-title">Bulk Update Inventory</h1>
          <Link to="/inventory" className="btn btn-secondary">
            <span>←</span> Back to Inventory
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success mb-4">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger mb-4">
            {errorMessage}
          </div>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title mb-4">Select Items to Update</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === inventoryItems.length && inventoryItems.length > 0}
                      />
                    </th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Current Quantity</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleItemSelection(item.id)}
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>{item.product.sku}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.location.warehouse}, {item.location.section}, {item.location.shelf}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-4">Bulk Update Options</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bulkAction" className="form-label">
                  Action <span className="text-danger">*</span>
                </label>
                <select
                  id="bulkAction"
                  name="bulkAction"
                  value={bulkAction}
                  onChange={handleBulkActionChange}
                  className="form-control"
                >
                  <option value="">Select Action</option>
                  <option value="updateQuantity">Update Quantity</option>
                  <option value="updateLocation">Update Location</option>
                </select>
              </div>

              {bulkAction === 'updateQuantity' && (
                <div className="form-group">
                  <label htmlFor="bulkQuantity" className="form-label">
                    New Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="bulkQuantity"
                    name="bulkQuantity"
                    value={bulkQuantity}
                    onChange={handleBulkQuantityChange}
                    className="form-control"
                    min="0"
                  />
                </div>
              )}

              {bulkAction === 'updateLocation' && (
                <div>
                  <h4 className="form-section-title">New Location</h4>

                  <div className="form-row three-cols">
                    <div className="form-group">
                      <label htmlFor="location.warehouse" className="form-label">
                        Warehouse <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="location.warehouse"
                        name="location.warehouse"
                        value={bulkLocation.warehouse}
                        onChange={handleLocationChange}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location.section" className="form-label">
                        Section <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="location.section"
                        name="location.section"
                        value={bulkLocation.section}
                        onChange={handleLocationChange}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location.shelf" className="form-label">
                        Shelf <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="location.shelf"
                        name="location.shelf"
                        value={bulkLocation.shelf}
                        onChange={handleLocationChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <Link to="/inventory" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedItems.length === 0}
                  className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Updating...' : 'Update Selected Items'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventoryBulkUpdate;
