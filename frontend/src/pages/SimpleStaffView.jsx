import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import StaffContext from '../context/StaffContext';
import '../styles/minimal.css';

const SimpleStaffView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const { getStaffMemberById } = useContext(StaffContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [staffMember, setStaffMember] = useState(null);

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchStaffMember = async () => {
      setLoading(true);
      try {
        // Get staff member from context
        const foundStaffMember = getStaffMemberById(parseInt(id));

        if (foundStaffMember) {
          setStaffMember(foundStaffMember);
        } else {
          // If staff member not found, navigate back to staff page
          navigate('/staff');
        }
      } catch (error) {
        console.error('Error fetching staff member:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMember();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="fade-in">
        <header className="header">
          <div className="container header-container">
            <Link to="/" className="brand">WholesaleFlow</Link>
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/customers" className="nav-link">Customers</Link>
              <Link to="/inventory" className="nav-link">Inventory</Link>
              <Link to="/staff" className="nav-link active">Staff</Link>
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

  if (!staffMember) {
    return (
      <div className="fade-in">
        <header className="header">
          <div className="container header-container">
            <Link to="/" className="brand">WholesaleFlow</Link>
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/customers" className="nav-link">Customers</Link>
              <Link to="/inventory" className="nav-link">Inventory</Link>
              <Link to="/staff" className="nav-link active">Staff</Link>
              <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="alert alert-danger">Staff member not found</div>
          <Link to="/staff" className="btn btn-primary">Back to Staff</Link>
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
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/staff" className="nav-link active">Staff</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Staff Details</h1>
          <div>
            <Link to="/staff" className="btn btn-secondary mr-2">
              Back to Staff
            </Link>
            <Link to={`/staff/${id}/edit`} className="btn btn-primary">
              Edit Staff Member
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{staffMember.firstName} {staffMember.lastName}</h2>
              <span className={`badge ${staffMember.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                {staffMember.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-sku">Position: {staffMember.position}</div>
              <div className="product-sku">Department: {staffMember.department}</div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Contact Information</h3>
                  <p className="detail-text">Email: {staffMember.email}</p>
                  <p className="detail-text">Phone: {staffMember.phone}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Employment</h3>
                  <p className="detail-text">Hire Date: {new Date(staffMember.hireDate).toLocaleDateString()}</p>
                  <p className="detail-text price">Salary: ₹{(staffMember.salary * 75).toLocaleString()}</p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Performance</h3>
                <div className="performance-bar" style={{ marginBottom: '0.5rem' }}>
                  <div
                    className="performance-progress"
                    style={{
                      width: `${staffMember.performance}%`,
                      backgroundColor: staffMember.performance >= 80 ? 'var(--success-color)' :
                                      staffMember.performance >= 60 ? 'var(--warning-color)' :
                                      'var(--danger-color)'
                    }}
                  ></div>
                </div>
                <p className="detail-text">{staffMember.performance}% Performance Rating</p>
              </div>

              {staffMember.notes && (
                <div className="detail-group">
                  <h3 className="detail-title">Notes</h3>
                  <p className="detail-text">{staffMember.notes}</p>
                </div>
              )}

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Created At</h3>
                  <p className="detail-text">{new Date(staffMember.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Last Updated</h3>
                  <p className="detail-text">{new Date(staffMember.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStaffView;
