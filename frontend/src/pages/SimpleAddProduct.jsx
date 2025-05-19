import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SimpleAddProduct = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sku: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    lowStockThreshold: '10',
    supplier: {
      name: '',
      contactInfo: ''
    }
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (!formData.sku) {
      errors.sku = 'SKU is required';
    }
    
    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
    
    if (!formData.costPrice) {
      errors.costPrice = 'Cost price is required';
    } else if (isNaN(formData.costPrice) || parseFloat(formData.costPrice) <= 0) {
      errors.costPrice = 'Cost price must be a positive number';
    }
    
    if (!formData.stockQuantity) {
      errors.stockQuantity = 'Stock quantity is required';
    } else if (isNaN(formData.stockQuantity) || parseInt(formData.stockQuantity) < 0) {
      errors.stockQuantity = 'Stock quantity must be a non-negative number';
    }
    
    if (!formData.lowStockThreshold) {
      errors.lowStockThreshold = 'Low stock threshold is required';
    } else if (isNaN(formData.lowStockThreshold) || parseInt(formData.lowStockThreshold) < 0) {
      errors.lowStockThreshold = 'Low stock threshold must be a non-negative number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real application, you would send this data to your API
        // For now, we'll simulate a successful API call
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        setSuccessMessage('Product added successfully!');
        
        // Reset form after success
        setFormData({
          name: '',
          description: '',
          category: '',
          sku: '',
          price: '',
          costPrice: '',
          stockQuantity: '',
          lowStockThreshold: '10',
          supplier: {
            name: '',
            contactInfo: ''
          }
        });
        
        // Redirect to products page after 2 seconds
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } catch (error) {
        console.error('Error adding product:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 0', 
        borderBottom: '1px solid #e5e7eb', 
        marginBottom: '20px' 
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Wholesale Management</div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/dashboard" style={{ color: '#3b82f6', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/products" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Products</Link>
          <Link to="/customers" style={{ color: '#3b82f6', textDecoration: 'none' }}>Customers</Link>
          <Link to="/inventory" style={{ color: '#3b82f6', textDecoration: 'none' }}>Inventory</Link>
          {user && user.role === 'admin' && (
            <Link to="/staff" style={{ color: '#3b82f6', textDecoration: 'none' }}>Staff</Link>
          )}
          <button 
            onClick={handleLogout} 
            style={{ 
              color: '#3b82f6', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: 0, 
              font: 'inherit' 
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Add New Product</h1>
          <Link 
            to="/products" 
            style={{ 
              color: '#6b7280', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            <span>←</span> Back to Products
          </Link>
        </div>
        
        {successMessage && (
          <div style={{ 
            backgroundColor: '#dcfce7', 
            color: '#166534', 
            padding: '12px 16px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            {successMessage}
          </div>
        )}
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '5px', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
          border: '1px solid #e5e7eb' 
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="name" 
                style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '5px' 
                }}
              >
                Product Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: formErrors.name ? '1px solid #ef4444' : '1px solid #d1d5db', 
                  borderRadius: '5px', 
                  boxSizing: 'border-box' 
                }} 
              />
              {formErrors.name && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.name}</p>
              )}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="description" 
                style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '5px' 
                }}
              >
                Description
              </label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '5px', 
                  boxSizing: 'border-box' 
                }} 
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="category" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Category <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select 
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.category ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                >
                  <option value="">Select Category</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.category && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.category}</p>
                )}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="sku" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  SKU <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  id="sku" 
                  name="sku" 
                  value={formData.sku} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.sku ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.sku && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.sku}</p>
                )}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="price" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Price ($) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  min="0" 
                  step="0.01" 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.price ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.price && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.price}</p>
                )}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="costPrice" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Cost Price ($) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="number" 
                  id="costPrice" 
                  name="costPrice" 
                  value={formData.costPrice} 
                  onChange={handleChange} 
                  min="0" 
                  step="0.01" 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.costPrice ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.costPrice && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.costPrice}</p>
                )}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="stockQuantity" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Stock Quantity <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="number" 
                  id="stockQuantity" 
                  name="stockQuantity" 
                  value={formData.stockQuantity} 
                  onChange={handleChange} 
                  min="0" 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.stockQuantity ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.stockQuantity && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.stockQuantity}</p>
                )}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="lowStockThreshold" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Low Stock Threshold <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="number" 
                  id="lowStockThreshold" 
                  name="lowStockThreshold" 
                  value={formData.lowStockThreshold} 
                  onChange={handleChange} 
                  min="0" 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.lowStockThreshold ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.lowStockThreshold && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.lowStockThreshold}</p>
                )}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Supplier Information</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label 
                    htmlFor="supplier.name" 
                    style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '5px' 
                    }}
                  >
                    Supplier Name
                  </label>
                  <input 
                    type="text" 
                    id="supplier.name" 
                    name="supplier.name" 
                    value={formData.supplier.name} 
                    onChange={handleChange} 
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '5px', 
                      boxSizing: 'border-box' 
                    }} 
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="supplier.contactInfo" 
                    style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '5px' 
                    }}
                  >
                    Supplier Contact Info
                  </label>
                  <input 
                    type="text" 
                    id="supplier.contactInfo" 
                    name="supplier.contactInfo" 
                    value={formData.supplier.contactInfo} 
                    onChange={handleChange} 
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '5px', 
                      boxSizing: 'border-box' 
                    }} 
                  />
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <Link 
                to="/products" 
                style={{ 
                  padding: '10px 16px', 
                  backgroundColor: '#f3f4f6', 
                  color: '#374151', 
                  borderRadius: '5px', 
                  textDecoration: 'none', 
                  fontWeight: '500' 
                }}
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                style={{ 
                  padding: '10px 16px', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  fontWeight: '500', 
                  opacity: isSubmitting ? 0.7 : 1 
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleAddProduct;
