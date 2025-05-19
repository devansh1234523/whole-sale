import React, { createContext, useState, useEffect } from 'react';

// Create the context
const StaffContext = createContext();

// Initial mock data for staff members
const initialStaffData = [
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

// Create the provider component
export const StaffProvider = ({ children }) => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the mock data
    setStaffMembers(initialStaffData);
    setLoading(false);
  }, []);

  // Get all staff members
  const getAllStaffMembers = () => {
    return staffMembers;
  };

  // Get staff member by ID
  const getStaffMemberById = (id) => {
    return staffMembers.find(staff => staff.id === parseInt(id));
  };

  // Add a new staff member
  const addStaffMember = (staffData) => {
    const newStaff = {
      ...staffData,
      id: staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setStaffMembers([...staffMembers, newStaff]);
    return newStaff;
  };

  // Update a staff member
  const updateStaffMember = (id, staffData) => {
    const updatedStaffMembers = staffMembers.map(staff => {
      if (staff.id === parseInt(id)) {
        return {
          ...staff,
          ...staffData,
          updatedAt: new Date().toISOString()
        };
      }
      return staff;
    });

    setStaffMembers(updatedStaffMembers);
    return getStaffMemberById(id);
  };

  // Delete a staff member
  const deleteStaffMember = (id) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== parseInt(id)));
  };

  // Toggle staff member status (active/inactive)
  const toggleStaffStatus = (id) => {
    const updatedStaffMembers = staffMembers.map(staff => {
      if (staff.id === parseInt(id)) {
        return {
          ...staff,
          status: staff.status === 'active' ? 'inactive' : 'active',
          updatedAt: new Date().toISOString()
        };
      }
      return staff;
    });

    setStaffMembers(updatedStaffMembers);
    return getStaffMemberById(id);
  };

  // Context value
  const contextValue = {
    staffMembers,
    loading,
    getAllStaffMembers,
    getStaffMemberById,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    toggleStaffStatus
  };

  return (
    <StaffContext.Provider value={contextValue}>
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContext;
