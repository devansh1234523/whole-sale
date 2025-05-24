import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const TermsConditions = () => {
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
              Terms & Conditions
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-medium)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using WholesaleFlow, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily download one copy of WholesaleFlow per device for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                3. Disclaimer
              </h2>
              <p>
                The materials on WholesaleFlow are provided on an 'as is' basis. WholesaleFlow makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                4. Limitations
              </h2>
              <p>
                In no event shall WholesaleFlow or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on WholesaleFlow, even if WholesaleFlow or an authorized representative has been 
                notified orally or in writing of the possibility of such damage.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                5. Privacy Policy
              </h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                6. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
                <p><strong>Email:</strong> legal@wholesaleflow.com</p>
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

export default TermsConditions;
