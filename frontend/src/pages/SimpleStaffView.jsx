import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleStaffView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
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
        // In a real app, you would fetch from an API or context
        // For now, we'll use mock data based on the ID
        
        // Mock data for staff members
        const mockStaffMembers = [
          {
            id: 1,
            firstName: 'Michael',
            lastName: 'Johnson',
            email: 'michael.j@example.com',
            phone: '555-123-4567',
            position: 'Sales Manager',
            department: 'Sales',
            hireDate: '2020-03-15',
            salary: 75000,
            status: 'active',
            performance: 85,
            notes: 'Excellent team leader with strong communication skills.',
            createdAt: '2020-03-10T10:30:00Z',
            updatedAt: '2023-01-15T14:45:00Z'
          },
          {
            id: 2,
            firstName: 'Sarah',
            lastName: 'Williams',
            email: 'sarah.w@example.com',
            phone: '555-987-6543',
            position: 'Inventory Specialist',
            department: 'Inventory',
            hireDate: '2021-05-20',
            salary: 65000,
            status: 'active',
            performance: 92,
            notes: 'Detail-oriented and highly organized.',
            createdAt: '2021-05-15T09:20:00Z',
            updatedAt: '2023-02-10T11:30:00Z'
          },
          {
            id: 3,
            firstName: 'Robert',
            lastName: 'Davis',
            email: 'robert.d@example.com',
            phone: '555-456-7890',
            position: 'Customer Service Rep',
            department: 'Customer Service',
            hireDate: '2019-11-10',
            salary: 55000,
            status: 'inactive',
            performance: 65,
            notes: 'Needs improvement in response time and customer satisfaction.',
            createdAt: '2019-11-05T08:15:00Z',
            updatedAt: '2022-12-01T16:20:00Z'
          }
        ];
        
        const foundStaffMember = mockStaffMembers.find(staff => staff.id === parseInt(id));
        
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
