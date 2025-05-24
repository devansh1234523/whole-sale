import React, { createContext, useState, useEffect } from 'react';

// Create the context
const InventoryContext = createContext();

// Create a provider component
export const InventoryProvider = ({ children }) => {
  // Initialize state with sample inventory items
  const [inventoryItems, setInventoryItems] = useState(() => {
    // Try to get inventory from localStorage
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }

    // Default sample inventory if none in localStorage
    const now = new Date().toISOString();
    return [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Sample Product 1',
          sku: 'SKU-001',
          category: 'Massager',
          price: 99.99
        },
        quantity: 25,
        location: {
          warehouse: 'Main Warehouse',
          section: 'A',
          shelf: '3'
        },
        lastUpdated: now,
        createdAt: '2023-01-15T10:30:00Z',
        transactions: [
          {
            id: 1,
            type: 'in',
            quantity: 30,
            date: '2023-01-15T10:30:00Z',
            reason: 'Initial stock',
            performedBy: 'Admin User'
          },
          {
            id: 2,
            type: 'out',
            quantity: 5,
            date: '2023-02-20T14:45:00Z',
            reason: 'Order #12345',
            performedBy: 'Sales Rep'
          }
        ]
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'Sample Product 2',
          sku: 'SKU-002',
          category: 'Toys',
          price: 49.99
        },
        quantity: 3,
        location: {
          warehouse: 'Main Warehouse',
          section: 'B',
          shelf: '1'
        },
        lastUpdated: now,
        createdAt: '2023-02-10T11:30:00Z',
        transactions: [
          {
            id: 3,
            type: 'in',
            quantity: 15,
            date: '2023-02-10T11:30:00Z',
            reason: 'Initial stock',
            performedBy: 'Admin User'
          },
          {
            id: 4,
            type: 'out',
            quantity: 10,
            date: '2023-04-05T13:20:00Z',
            reason: 'Order #12346',
            performedBy: 'Sales Rep'
          },
          {
            id: 5,
            type: 'out',
            quantity: 2,
            date: '2023-05-18T10:10:00Z',
            reason: 'Order #12350',
            performedBy: 'Sales Rep'
          }
        ]
      }
    ];
  });

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  // Add a transaction to an inventory item
  const addTransaction = (inventoryId, transaction) => {
    // Find the inventory item
    const inventoryItem = getInventoryById(inventoryId);
    if (!inventoryItem) return null;

    // Generate a new transaction ID
    const newTransactionId = inventoryItem.transactions.length > 0
      ? Math.max(...inventoryItem.transactions.map(t => t.id)) + 1
      : 1;

    // Get current timestamp
    const now = new Date().toISOString();

    // Create the new transaction
    const newTransaction = {
      ...transaction,
      id: newTransactionId,
      date: now,
      performedBy: 'Current User' // In a real app, this would come from auth context
    };

    // Calculate new quantity based on transaction type
    let newQuantity = inventoryItem.quantity;
    if (transaction.type === 'in') {
      newQuantity += parseInt(transaction.quantity);
    } else if (transaction.type === 'out') {
      newQuantity -= parseInt(transaction.quantity);
      if (newQuantity < 0) {
        return { error: 'Not enough stock available' };
      }
    } else if (transaction.type === 'adjustment') {
      newQuantity = parseInt(transaction.quantity);
    }

    // Update the inventory item
    const updatedInventoryItem = {
      ...inventoryItem,
      quantity: newQuantity,
      lastUpdated: now,
      transactions: [...inventoryItem.transactions, newTransaction]
    };

    // Update the inventory items state
    setInventoryItems(inventoryItems.map(item =>
      item.id === inventoryId ? updatedInventoryItem : item
    ));

    return updatedInventoryItem;
  };

  // Update an inventory item
  const updateInventory = (updatedInventory) => {
    // Ensure the inventory has an updatedAt timestamp
    updatedInventory.lastUpdated = new Date().toISOString();

    setInventoryItems(inventoryItems.map(item =>
      item.id === updatedInventory.id ? updatedInventory : item
    ));

    return updatedInventory;
  };

  // Get an inventory item by ID
  const getInventoryById = (inventoryId) => {
    return inventoryItems.find(item => item.id === parseInt(inventoryId));
  };

  // Add a new inventory item for a product
  const addInventoryItem = (product) => {
    // Generate a new inventory ID
    const newId = inventoryItems.length > 0
      ? Math.max(...inventoryItems.map(item => item.id)) + 1
      : 1;

    // Get current timestamp
    const now = new Date().toISOString();

    // Create the new inventory item
    const newInventoryItem = {
      id: newId,
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price
      },
      quantity: product.stockQuantity || 0,
      location: {
        warehouse: 'Main Warehouse',
        section: 'A',
        shelf: '1'
      },
      lastUpdated: now,
      createdAt: now,
      transactions: [
        {
          id: 1,
          type: 'in',
          quantity: product.stockQuantity || 0,
          date: now,
          reason: 'Initial stock from product creation',
          performedBy: 'System'
        }
      ]
    };

    // Add the new inventory item to the state
    setInventoryItems([...inventoryItems, newInventoryItem]);
    return newInventoryItem;
  };

  // The context value that will be provided
  const contextValue = {
    inventoryItems,
    addTransaction,
    updateInventory,
    getInventoryById,
    addInventoryItem
  };

  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
