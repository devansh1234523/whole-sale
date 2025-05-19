import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

const SimpleHome = () => {
  const { setTheme } = useContext(ThemeContext);

  // Ensure light theme is set on home page
  useEffect(() => {
    setTheme('light');
    document.body.className = 'theme-light';
  }, [setTheme]);
  return (
    <div className="fade-in">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">WholesaleFlow</Link>
          <div className="navbar-links">
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>WholesaleFlow</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', marginBottom: '3rem' }}>
            Streamline your wholesale operations with our all-in-one management platform
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <Link to="/login" className="btn btn-primary btn-lg" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '0.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              borderRadius: '0.5rem',
              boxShadow: 'var(--shadow)'
            }}>
              Register
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '4rem' }}>
          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-users"></i>
                👥
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Customer Segmentation</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Categorize customers based on purchase history, location, industry, or other criteria to target them effectively.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--success-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-user-tie"></i>
                👤
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Staff Management</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Track staff activities, monitor performance, and manage clock-in/clock-out for better productivity.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--warning-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-boxes"></i>
                📦
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Inventory Management</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Keep track of your inventory in real-time, receive low stock alerts, and manage product categories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-5" style={{
        padding: '3rem',
        background: 'linear-gradient(135deg, var(--primary-color), #4299e1)',
        color: 'white',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '1.125rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto', marginBottom: '1.5rem' }}>
            Join our platform today and take your wholesale business to the next level.
          </p>

          <Link to="/register" className="btn btn-lg" style={{
            backgroundColor: 'white',
            color: 'var(--primary-color)',
            padding: '0.75rem 2rem',
            fontWeight: '600',
            borderRadius: '0.5rem'
          }}>
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;
