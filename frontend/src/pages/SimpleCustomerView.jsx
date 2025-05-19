import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CustomerContext from '../context/CustomerContext';
import '../styles/minimal.css';

const SimpleCustomerView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const { getCustomerById } = useContext(CustomerContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        // Get customer from context
        const foundCustomer = getCustomerById(parseInt(id));

        if (foundCustomer) {
          setCustomer(foundCustomer);
        } else {
          // If customer not found, navigate back to customers page
          navigate('/customers');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, navigate, getCustomerById]);

  if (loading) {
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
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!customer) {
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
          <div className="alert alert-danger">Customer not found</div>
          <Link to="/customers" className="btn btn-primary">Back to Customers</Link>
        </div>
      </div>
    );
  }

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
          <h1 className="page-title">Customer Details</h1>
          <div>
            <Link to="/customers" className="btn btn-secondary mr-2">
              Back to Customers
            </Link>
            <Link to={`/customers/${id}/edit`} className="btn btn-primary">
              Edit Customer
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{customer.name}</h2>
              <span className="badge badge-primary">
                {customer.segment}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-sku">Company: {customer.company}</div>
              <div className="product-sku">Industry: {customer.industry}</div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Contact Information</h3>
                  <p className="detail-text">Email: {customer.email}</p>
                  <p className="detail-text">Phone: {customer.phone}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Financial</h3>
                  <p className="detail-text price">${customer.totalSpent.toFixed(2)} Total Spent</p>
                  <p className="detail-text">Last Purchase: {new Date(customer.lastPurchase).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Address</h3>
                <p className="detail-text">
                  {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.zipCode}, {customer.address.country}
                </p>
              </div>

              {customer.notes && (
                <div className="detail-group">
                  <h3 className="detail-title">Notes</h3>
                  <p className="detail-text">{customer.notes}</p>
                </div>
              )}

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Created At</h3>
                  <p className="detail-text">{new Date(customer.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Last Updated</h3>
                  <p className="detail-text">{new Date(customer.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCustomerView;
