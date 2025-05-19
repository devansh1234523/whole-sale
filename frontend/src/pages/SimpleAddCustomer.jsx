import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CustomerContext from '../context/CustomerContext';
import '../styles/minimal.css';

const SimpleAddCustomer = () => {
  const { user, logout } = useContext(AuthContext);
  const { addCustomer } = useContext(CustomerContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    industry: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Customer name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.segment) {
      errors.segment = 'Segment is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Add the customer using the context
        addCustomer(formData);

        // Show success message
        setSuccessMessage('Customer added successfully!');

        // Reset form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          segment: '',
          industry: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          notes: ''
        });

        // Redirect to customers page after 2 seconds
        setTimeout(() => {
          navigate('/customers');
        }, 2000);
      } catch (error) {
        console.error('Error adding customer:', error);
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
            <Link to="/customers" className="nav-link active">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="nav-link">Staff</Link>
            )}
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add New Customer</h1>
          <Link to="/customers" className="btn btn-secondary">
            <span>←</span> Back to Customers
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success mb-4">
            {successMessage}
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h3 className="form-section-title mb-4">Basic Information</h3>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Customer Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="segment" className="form-label">
                    Segment <span className="text-danger">*</span>
                  </label>
                  <select
                    id="segment"
                    name="segment"
                    value={formData.segment}
                    onChange={handleChange}
                    className={`form-control ${formErrors.segment ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Segment</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="distributor">Distributor</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.segment && (
                    <div className="invalid-feedback">{formErrors.segment}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="industry" className="form-label">
                    Industry
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <h3 className="form-section-title mt-5 mb-4">Address</h3>

              <div className="form-group">
                <label htmlFor="address.street" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="address.city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.state" className="form-label">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="address.zipCode" className="form-label">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="form-control"
                />
              </div>

              <div className="form-actions">
                <Link to="/customers" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAddCustomer;
