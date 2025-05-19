import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CustomerProvider } from './context/CustomerContext';
import { InventoryProvider } from './context/InventoryContext';
import { StaffProvider } from './context/StaffContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import SimpleHome from './pages/SimpleHome';
import SimpleLogin from './pages/SimpleLogin';
import SimpleRegister from './pages/SimpleRegister';
import SimpleDashboard from './pages/SimpleDashboard';
import SimpleProducts from './pages/SimpleProducts';
import SimpleAddProduct from './pages/SimpleAddProduct';
import SimpleProductView from './pages/SimpleProductView';
import SimpleProductEdit from './pages/SimpleProductEdit';
import SimpleLowStockProducts from './pages/SimpleLowStockProducts';
import SimpleCustomers from './pages/SimpleCustomers';
import SimpleAddCustomer from './pages/SimpleAddCustomer';
import SimpleCustomerView from './pages/SimpleCustomerView';
import SimpleCustomerEdit from './pages/SimpleCustomerEdit';
import SimpleInventory from './pages/SimpleInventory';
import SimpleInventoryView from './pages/SimpleInventoryView';
import SimpleInventoryEdit from './pages/SimpleInventoryEdit';
import SimpleInventoryAddTransaction from './pages/SimpleInventoryAddTransaction';
import SimpleInventoryBulkUpdate from './pages/SimpleInventoryBulkUpdate';
import SimpleStaff from './pages/SimpleStaff';
import SimpleAddStaff from './pages/SimpleAddStaff';
import SimpleStaffView from './pages/SimpleStaffView';
import SimpleStaffEdit from './pages/SimpleStaffEdit';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <CustomerProvider>
            <InventoryProvider>
              <StaffProvider>
                <Router>
                  <Routes>
                <Route path="/" element={<SimpleHome />} />
            <Route path="/login" element={<SimpleLogin />} />
            <Route path="/register" element={<SimpleRegister />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/products" element={<SimpleProducts />} />
            <Route path="/products/add" element={<SimpleAddProduct />} />
            <Route path="/products/low-stock" element={<SimpleLowStockProducts />} />
            <Route path="/products/:id" element={<SimpleProductView />} />
            <Route path="/products/:id/edit" element={<SimpleProductEdit />} />
            <Route path="/customers" element={<SimpleCustomers />} />
            <Route path="/customers/add" element={<SimpleAddCustomer />} />
            <Route path="/customers/:id" element={<SimpleCustomerView />} />
            <Route path="/customers/:id/edit" element={<SimpleCustomerEdit />} />
            <Route path="/inventory/add-transaction" element={<SimpleInventoryAddTransaction />} />
            <Route path="/inventory/bulk-update" element={<SimpleInventoryBulkUpdate />} />
            <Route path="/inventory/:id/update" element={<SimpleInventoryEdit />} />
            <Route path="/inventory/:id" element={<SimpleInventoryView />} />
            <Route path="/inventory" element={<SimpleInventory />} />
            <Route path="/staff/add" element={<SimpleAddStaff />} />
            <Route path="/staff/:id/edit" element={<SimpleStaffEdit />} />
            <Route path="/staff/:id" element={<SimpleStaffView />} />
            <Route path="/staff" element={<SimpleStaff />} />
            {/* Add more routes as needed */}
                  </Routes>
                </Router>
              </StaffProvider>
            </InventoryProvider>
          </CustomerProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
