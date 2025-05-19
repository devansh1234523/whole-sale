import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import InventoryContext from '../context/InventoryContext';
import ProductContext from '../context/ProductContext';
import '../styles/minimal.css';

const SimpleInventoryAddTransaction = () => {
  const { user, logout } = useContext(AuthContext);
  const { inventoryItems, addTransaction, getInventoryById } = useContext(InventoryContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    inventoryId: '',
    type: 'in',
    quantity: '',
    reason: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.inventoryId) {
      errors.inventoryId = 'Please select a product';
    }

    if (!formData.quantity.trim()) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.reason.trim()) {
      errors.reason = 'Reason is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Get the inventory item to check current quantity for adjustments
        const inventoryItem = getInventoryById(parseInt(formData.inventoryId));

        // Add the transaction using the context
        const result = addTransaction(parseInt(formData.inventoryId), {
          type: formData.type,
          quantity: formData.type === 'adjustment'
            ? parseInt(formData.quantity) // For adjustment, use the new quantity directly
            : parseInt(formData.quantity), // For in/out, use the quantity as is
          reason: formData.reason
        });

        if (result && result.error) {
          setErrorMessage(result.error);
        } else {
          // Show success message
          setSuccessMessage('Transaction added successfully!');

          // Reset form after success
          setFormData({
            inventoryId: '',
            type: 'in',
            quantity: '',
            reason: ''
          });

          // Redirect to inventory page after 2 seconds
          setTimeout(() => {
            navigate('/inventory');
          }, 2000);
        }
      } catch (error) {
        console.error('Error adding transaction:', error);
        setErrorMessage('An error occurred while adding the transaction');
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
          <h1 className="page-title">Add Inventory Transaction</h1>
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

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inventoryId" className="form-label">
                  Product <span className="text-danger">*</span>
                </label>
                <select
                  id="inventoryId"
                  name="inventoryId"
                  value={formData.inventoryId}
                  onChange={handleChange}
                  className={`form-control ${formErrors.inventoryId ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Product</option>
                  {inventoryItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.product.name} - Current Stock: {item.quantity}
                    </option>
                  ))}
                </select>
                {formErrors.inventoryId && (
                  <div className="invalid-feedback">{formErrors.inventoryId}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="type" className="form-label">
                  Transaction Type <span className="text-danger">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="in">Stock In</option>
                  <option value="out">Stock Out</option>
                  <option value="adjustment">Direct Adjustment</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  {formData.type === 'adjustment' ? 'New Quantity' : 'Quantity'} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`form-control ${formErrors.quantity ? 'is-invalid' : ''}`}
                />
                {formErrors.quantity && (
                  <div className="invalid-feedback">{formErrors.quantity}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="reason" className="form-label">
                  Reason <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={`form-control ${formErrors.reason ? 'is-invalid' : ''}`}
                  placeholder={formData.type === 'in' ? 'e.g., New shipment' : 'e.g., Order #12345'}
                />
                {formErrors.reason && (
                  <div className="invalid-feedback">{formErrors.reason}</div>
                )}
              </div>

              <div className="form-actions">
                <Link to="/inventory" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Saving...' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventoryAddTransaction;
