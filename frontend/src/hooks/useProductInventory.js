import { useContext } from 'react';
import ProductContext from '../context/ProductContext';
import InventoryContext from '../context/InventoryContext';

// Custom hook to coordinate between Product and Inventory contexts
export const useProductInventory = () => {
  const { products, addProduct: addProductToContext, updateProduct, deleteProduct, getProductById } = useContext(ProductContext);
  const { inventoryItems, addInventoryItem, addTransaction, updateInventory, getInventoryById } = useContext(InventoryContext);

  // Enhanced addProduct function that also creates inventory item
  const addProduct = (productData) => {
    // First add the product to ProductContext
    const newProduct = addProductToContext(productData);
    
    // Then create corresponding inventory item
    if (newProduct) {
      addInventoryItem(newProduct);
    }
    
    return newProduct;
  };

  // Enhanced updateProduct function that also updates inventory if needed
  const updateProductWithInventory = (updatedProduct) => {
    // Update the product
    const result = updateProduct(updatedProduct);
    
    // Find and update corresponding inventory item
    const inventoryItem = inventoryItems.find(item => item.product.id === updatedProduct.id);
    if (inventoryItem) {
      const updatedInventoryItem = {
        ...inventoryItem,
        product: {
          ...inventoryItem.product,
          name: updatedProduct.name,
          sku: updatedProduct.sku,
          category: updatedProduct.category,
          price: updatedProduct.price
        },
        quantity: updatedProduct.stockQuantity || inventoryItem.quantity
      };
      updateInventory(updatedInventoryItem);
    }
    
    return result;
  };

  return {
    // Product functions
    products,
    addProduct,
    updateProduct: updateProductWithInventory,
    deleteProduct,
    getProductById,
    
    // Inventory functions
    inventoryItems,
    addTransaction,
    updateInventory,
    getInventoryById
  };
};
