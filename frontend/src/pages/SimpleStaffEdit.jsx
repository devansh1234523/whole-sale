import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleStaffEdit = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '',
    salary: '',
    status: '',
    performance: '',
    notes: ''
  });

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
          setFormData({
            firstName: foundStaffMember.firstName,
            lastName: foundStaffMember.lastName,
            email: foundStaffMember.email,
            phone: foundStaffMember.phone || '',
            position: foundStaffMember.position,
            department: foundStaffMember.department,
            hireDate: foundStaffMember.hireDate,
            salary: foundStaffMember.salary.toString(),
            status: foundStaffMember.status,
            performance: foundStaffMember.performance.toString(),
            notes: foundStaffMember.notes || ''
          });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    }

    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }

    if (!formData.hireDate.trim()) {
      errors.hireDate = 'Hire date is required';
    }

    if (!formData.salary.trim()) {
      errors.salary = 'Salary is required';
    } else if (isNaN(parseFloat(formData.salary)) || parseFloat(formData.salary) <= 0) {
      errors.salary = 'Salary must be a positive number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Simulate updating staff member
        console.log('Updating staff member:', formData);
        
        // In a real app, you would call an API or context method here
        // For now, we'll just simulate success
        
        // Show success message
        setSuccessMessage('Staff member updated successfully!');

        // Redirect to staff page after 2 seconds
        setTimeout(() => {
          navigate('/staff');
        }, 2000);
      } catch (error) {
        console.error('Error updating staff member:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
          <h1 className="page-title">Edit Staff Member</h1>
          <Link to="/staff" className="btn btn-secondary">
            Back to Staff
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success mb-4">
            {successMessage}
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h3 className="form-section-title">Personal Information</h3>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h3 className="form-section-title">Employment Details</h3>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="position" className="form-label">Position <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className={`form-control ${formErrors.position ? 'is-invalid' : ''}`}
                    value={formData.position}
                    onChange={handleChange}
                  />
                  {formErrors.position && <div className="invalid-feedback">{formErrors.position}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="department" className="form-label">Department <span className="text-danger">*</span></label>
                  <select
                    id="department"
                    name="department"
                    className={`form-control ${formErrors.department ? 'is-invalid' : ''}`}
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Administration">Administration</option>
                  </select>
                  {formErrors.department && <div className="invalid-feedback">{formErrors.department}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="hireDate" className="form-label">Hire Date <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    id="hireDate"
                    name="hireDate"
                    className={`form-control ${formErrors.hireDate ? 'is-invalid' : ''}`}
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                  {formErrors.hireDate && <div className="invalid-feedback">{formErrors.hireDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="salary" className="form-label">Salary <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    className={`form-control ${formErrors.salary ? 'is-invalid' : ''}`}
                    value={formData.salary}
                    onChange={handleChange}
                  />
                  {formErrors.salary && <div className="invalid-feedback">{formErrors.salary}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    id="status"
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="performance" className="form-label">Performance (%)</label>
                  <input
                    type="number"
                    id="performance"
                    name="performance"
                    min="0"
                    max="100"
                    className="form-control"
                    value={formData.performance}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <Link to="/staff" className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStaffEdit;
