import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import SimpleHome from './pages/SimpleHome';
import SimpleLogin from './pages/SimpleLogin';
import SimpleRegister from './pages/SimpleRegister';
import SimpleDashboard from './pages/SimpleDashboard';
import SimpleProducts from './pages/SimpleProducts';
import SimpleAddProduct from './pages/SimpleAddProduct';
import SimpleCustomers from './pages/SimpleCustomers';
import SimpleAddCustomer from './pages/SimpleAddCustomer';
import SimpleInventory from './pages/SimpleInventory';
import SimpleStaff from './pages/SimpleStaff';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/login" element={<SimpleLogin />} />
          <Route path="/register" element={<SimpleRegister />} />
          <Route path="/dashboard" element={<SimpleDashboard />} />
          <Route path="/products" element={<SimpleProducts />} />
          <Route path="/products/add" element={<SimpleAddProduct />} />
          <Route path="/customers" element={<SimpleCustomers />} />
          <Route path="/customers/add" element={<SimpleAddCustomer />} />
          <Route path="/inventory" element={<SimpleInventory />} />
          <Route path="/staff" element={<SimpleStaff />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
