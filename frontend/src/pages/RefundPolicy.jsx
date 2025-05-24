import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme('light');
    document.body.className = 'theme-light';
    window.scrollTo(0, 0);
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

      <div className="container" style={{ padding: '2rem 0', maxWidth: '800px' }}>
        <div className="card">
          <div className="card-body" style={{ padding: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              Refund Policy
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-medium)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                30-Day Money-Back Guarantee
              </h2>
              <p>
                We offer a 30-day money-back guarantee for all WholesaleFlow subscriptions. If you're not completely 
                satisfied with our service, you can request a full refund within 30 days of your initial purchase.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Eligibility for Refunds
              </h2>
              <p>
                To be eligible for a refund, you must meet the following criteria:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Request must be made within 30 days of initial purchase</li>
                <li>Account must not have violated our Terms of Service</li>
                <li>No excessive usage that indicates abuse of the refund policy</li>
                <li>Provide a valid reason for the refund request</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                How to Request a Refund
              </h2>
              <p>
                To request a refund, please follow these steps:
              </p>
              <ol style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Contact our support team via email or phone</li>
                <li>Provide your account information and order details</li>
                <li>Explain the reason for your refund request</li>
                <li>Allow 3-5 business days for processing</li>
              </ol>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Refund Processing
              </h2>
              <p>
                Once your refund request is approved:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Refunds will be processed within 5-7 business days</li>
                <li>Refunds will be issued to the original payment method</li>
                <li>You will receive an email confirmation once processed</li>
                <li>Your account access will be terminated upon refund completion</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Non-Refundable Items
              </h2>
              <p>
                The following items are not eligible for refunds:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Custom development or integration services</li>
                <li>Training sessions that have already been conducted</li>
                <li>Third-party add-ons or services</li>
                <li>Subscriptions older than 30 days</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Partial Refunds
              </h2>
              <p>
                In some cases, we may offer partial refunds for:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Downgrading to a lower-tier plan</li>
                <li>Service interruptions caused by our platform</li>
                <li>Unused portions of annual subscriptions (prorated)</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Contact Information
              </h2>
              <p>
                For refund requests or questions about this policy, please contact us:
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
                <p><strong>Email:</strong> billing@wholesaleflow.com</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                <p><strong>Address:</strong> 123 Business Avenue, Suite 500, New York, NY 10001</p>
                <p><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</p>
              </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
