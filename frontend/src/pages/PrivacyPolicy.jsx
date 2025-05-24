import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-medium)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, use our services, 
                or contact us for support. This may include:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Name, email address, and contact information</li>
                <li>Business information and company details</li>
                <li>Product and inventory data</li>
                <li>Customer and staff information you input into our system</li>
                <li>Usage data and analytics</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy. We may share information in the following circumstances:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>With your consent or at your direction</li>
                <li>With service providers who assist us in operating our platform</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                4. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                5. Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
                <p><strong>Email:</strong> privacy@wholesaleflow.com</p>
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

export default PrivacyPolicy;
