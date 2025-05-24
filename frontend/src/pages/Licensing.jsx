import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const Licensing = () => {
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
              Licensing Information
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-medium)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Software License
              </h2>
              <p>
                WholesaleFlow is proprietary software licensed under our End User License Agreement (EULA). 
                By using our software, you agree to the terms and conditions outlined in this licensing agreement.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                License Types
              </h2>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                Standard License
              </h3>
              <p>
                Our standard license allows you to use WholesaleFlow for your business operations with the following permissions:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Use the software for commercial purposes</li>
                <li>Access all standard features and updates</li>
                <li>Store and process your business data</li>
                <li>Receive customer support during business hours</li>
              </ul>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                Enterprise License
              </h3>
              <p>
                Our enterprise license includes additional benefits:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Advanced features and customization options</li>
                <li>Priority customer support</li>
                <li>Custom integrations and API access</li>
                <li>Dedicated account management</li>
                <li>On-premise deployment options</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Restrictions
              </h2>
              <p>
                Under this license, you may not:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Reverse engineer, decompile, or disassemble the software</li>
                <li>Redistribute or resell the software</li>
                <li>Remove or modify any copyright notices</li>
                <li>Use the software for illegal activities</li>
                <li>Share your account credentials with unauthorized users</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Third-Party Licenses
              </h2>
              <p>
                WholesaleFlow incorporates various third-party libraries and components. 
                These components are licensed under their respective open-source licenses:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>React - MIT License</li>
                <li>Node.js - MIT License</li>
                <li>Express.js - MIT License</li>
                <li>MongoDB - Server Side Public License (SSPL)</li>
                <li>Chart.js - MIT License</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Intellectual Property
              </h2>
              <p>
                All intellectual property rights in WholesaleFlow, including but not limited to:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Source code and algorithms</li>
                <li>User interface design</li>
                <li>Documentation and materials</li>
                <li>Trademarks and logos</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                remain the exclusive property of WholesaleFlow and its licensors.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                License Termination
              </h2>
              <p>
                This license may be terminated:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>By you at any time by discontinuing use</li>
                <li>By us if you violate the terms of this agreement</li>
                <li>Upon expiration of your subscription</li>
                <li>For non-payment of fees</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Contact Information
              </h2>
              <p>
                For licensing questions or to request additional licensing options, please contact us:
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
                <p><strong>Email:</strong> licensing@wholesaleflow.com</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                <p><strong>Address:</strong> 123 Business Avenue, Suite 500, New York, NY 10001</p>
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

export default Licensing;
