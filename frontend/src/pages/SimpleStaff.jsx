import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import StaffContext from '../context/StaffContext';
import Header from '../components/Header';
import '../styles/minimal.css';

const SimpleStaff = () => {
  const { user, logout } = useContext(AuthContext);
  const { staffMembers, toggleStaffStatus } = useContext(StaffContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    department: '',
    status: '',
    search: ''
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

  const handleAddStaff = () => {
    navigate('/staff/add');
  };

  const handleViewStaff = (id) => {
    navigate(`/staff/${id}`);
  };

  const handleEditStaff = (id) => {
    navigate(`/staff/${id}/edit`);
  };

  const handleToggleStatus = (id) => {
    toggleStaffStatus(id);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  // Filter staff members based on filter criteria
  const filteredStaffMembers = staffMembers.filter(staff => {
    // Filter by department
    if (filter.department && staff.department !== filter.department) {
      return false;
    }

    // Filter by status
    if (filter.status && staff.status !== filter.status) {
      return false;
    }

    // Filter by search term
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      return (
        staff.firstName.toLowerCase().includes(searchTerm) ||
        staff.lastName.toLowerCase().includes(searchTerm) ||
        staff.position.toLowerCase().includes(searchTerm) ||
        staff.email.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });

  return (
    <div className="fade-in">
      <Header />

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Staff Management</h1>
          <button
            onClick={handleAddStaff}
            className="btn btn-primary"
          >
            Add New Staff
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="department" className="form-label">
                  Filter by Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="form-control"
                  value={filter.department}
                  onChange={handleFilterChange}
                >
                  <option value="">All Departments</option>
                  <option value="Sales">Sales</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={filter.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Staff
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search by name or position"
                  className="form-control"
                  value={filter.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaffMembers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">No staff members found matching your criteria</td>
                  </tr>
                ) : (
                  filteredStaffMembers.map(staff => (
                    <tr key={staff.id}>
                      <td style={{ fontWeight: '500' }}>{staff.firstName} {staff.lastName}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          color: 'var(--text-medium)',
                          fontWeight: '500'
                        }}>
                          {staff.position}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          color: 'var(--text-medium)',
                          fontWeight: '500'
                        }}>
                          {staff.department}
                        </span>
                      </td>
                      <td>{staff.email}</td>
                      <td>
                        <span className={`badge ${staff.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {staff.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="performance-bar">
                          <div
                            className="performance-progress"
                            style={{
                              width: `${staff.performance}%`,
                              backgroundColor: staff.performance >= 80 ? 'var(--success-color)' :
                                              staff.performance >= 60 ? 'var(--warning-color)' :
                                              'var(--danger-color)'
                            }}
                          ></div>
                        </div>
                        <span className="performance-text">{staff.performance}%</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button onClick={() => handleViewStaff(staff.id)} className="action-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>View</button>
                          <button onClick={() => handleEditStaff(staff.id)} className="action-link edit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Edit</button>
                          <button
                            onClick={() => handleToggleStatus(staff.id)}
                            className="action-link"
                            style={{
                              color: staff.status === 'active' ? 'var(--danger-color)' : 'var(--success-color)',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer'
                            }}
                          >
                            {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStaff;
