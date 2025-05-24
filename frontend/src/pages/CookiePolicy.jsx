import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const CookiePolicy = () => {
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
              Cookie Policy
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-medium)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Types of Cookies We Use
              </h2>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                Essential Cookies
              </h3>
              <p>
                These cookies are necessary for the website to function properly. They enable basic functions like 
                page navigation, access to secure areas, and authentication.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                Performance Cookies
              </h3>
              <p>
                These cookies collect information about how visitors use our website, such as which pages are visited most often. 
                This data helps us improve the website's performance and user experience.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                Functional Cookies
              </h3>
              <p>
                These cookies allow the website to remember choices you make and provide enhanced features. 
                They may be set by us or by third-party providers whose services we use.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Managing Cookies
              </h2>
              <p>
                You can control and manage cookies in various ways:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Browser settings: Most browsers allow you to refuse cookies or delete existing ones</li>
                <li>Third-party tools: Use privacy tools to manage tracking cookies</li>
                <li>Opt-out links: Some services provide direct opt-out options</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Third-Party Cookies
              </h2>
              <p>
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                <li>Analytics services to understand website usage</li>
                <li>Authentication services for secure login</li>
                <li>Content delivery networks for improved performance</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with 
                an updated revision date.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy;
