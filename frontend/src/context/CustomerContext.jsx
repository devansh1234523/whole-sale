import React, { createContext, useState, useEffect } from 'react';

// Create the context
const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
  // Initialize state with sample customers
  const [customers, setCustomers] = useState(() => {
    // Try to get customers from localStorage
    const savedCustomers = localStorage.getItem('customers');
    if (savedCustomers) {
      return JSON.parse(savedCustomers);
    }

    // Default sample customers if none in localStorage
    const now = new Date().toISOString();
    return [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        company: 'ABC Retail',
        segment: 'Retail',
        industry: 'Consumer Goods',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        totalSpent: 5250.00,
        lastPurchase: now,
        notes: 'Prefers email communication. Interested in bulk discounts.',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+1 (555) 987-6543',
        company: 'XYZ Distributors',
        segment: 'Distributor',
        industry: 'Wholesale',
        address: {
          street: '456 Market Ave',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        totalSpent: 12750.00,
        lastPurchase: now,
        notes: 'Key account. Monthly ordering schedule.',
        createdAt: now,
        updatedAt: now
      }
    ];
  });

  // Save customers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  // Add a new customer
  const addCustomer = (customer) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = customers.length > 0
      ? Math.max(...customers.map(c => c.id)) + 1
      : 1;

    // Get current timestamp
    const now = new Date().toISOString();

    // Create the new customer with the generated ID and timestamps
    const newCustomer = {
      ...customer,
      id: newId,
      totalSpent: 0,
      lastPurchase: null,
      createdAt: now,
      updatedAt: now
    };

    // Update the customers state
    setCustomers([...customers, newCustomer]);
    return newCustomer;
  };

  // Update an existing customer
  const updateCustomer = (updatedCustomer) => {
    // Ensure the customer has an updatedAt timestamp
    updatedCustomer.updatedAt = new Date().toISOString();

    setCustomers(customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));

    return updatedCustomer;
  };

  // Delete a customer
  const deleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  // Get a customer by ID
  const getCustomerById = (customerId) => {
    return customers.find(customer => customer.id === parseInt(customerId));
  };

  // The context value that will be provided
  const contextValue = {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById
  };

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
