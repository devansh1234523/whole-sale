import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';

const Sitemap = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme('light');
    document.body.className = 'theme-light';
    window.scrollTo(0, 0);
  }, [setTheme]);

  const siteLinks = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'Dashboard', path: '/dashboard' }
      ]
    },
    {
      category: 'Product Management',
      links: [
        { name: 'Products', path: '/products' },
        { name: 'Add Product', path: '/products/add' },
        { name: 'Low Stock Products', path: '/products/low-stock' }
      ]
    },
    {
      category: 'Customer Management',
      links: [
        { name: 'Customers', path: '/customers' },
        { name: 'Add Customer', path: '/customers/add' }
      ]
    },
    {
      category: 'Inventory Management',
      links: [
        { name: 'Inventory', path: '/inventory' },
        { name: 'Add Transaction', path: '/inventory/add-transaction' },
        { name: 'Bulk Update', path: '/inventory/bulk-update' }
      ]
    },
    {
      category: 'Staff Management',
      links: [
        { name: 'Staff', path: '/staff' },
        { name: 'Add Staff', path: '/staff/add' }
      ]
    },
    {
      category: 'Legal & Policies',
      links: [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Refund Policy', path: '/refund' },
        { name: 'Licensing', path: '/licensing' }
      ]
    }
  ];

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

      <div className="container" style={{ padding: '2rem 0', maxWidth: '1000px' }}>
        <div className="card">
          <div className="card-body" style={{ padding: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              Sitemap
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '3rem', fontSize: '1.125rem' }}>
              Navigate through all pages and features of WholesaleFlow
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {siteLinks.map((section, index) => (
                <div key={index} className="card" style={{ 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '1rem', 
                    color: 'var(--primary-color)',
                    borderBottom: '2px solid var(--primary-color)',
                    paddingBottom: '0.5rem'
                  }}>
                    {section.category}
                  </h3>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: '0', 
                    margin: '0' 
                  }}>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} style={{ marginBottom: '0.75rem' }}>
                        <Link 
                          to={link.path} 
                          style={{ 
                            color: 'var(--text-medium)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--secondary-color)';
                            e.target.style.color = 'var(--primary-color)';
                            e.target.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--text-medium)';
                            e.target.style.transform = 'translateX(0)';
                          }}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <span style={{ marginRight: '0.5rem' }}>→</span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ 
              backgroundColor: 'var(--light-bg)', 
              padding: '2rem', 
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: 'var(--text-dark)' 
              }}>
                Need Help?
              </h3>
              <p style={{ color: 'var(--text-medium)', marginBottom: '1.5rem' }}>
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="mailto:support@wholesaleflow.com" 
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  Email Support
                </a>
                <a 
                  href="tel:+1234567890" 
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Call Support
                </a>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
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

export default Sitemap;
