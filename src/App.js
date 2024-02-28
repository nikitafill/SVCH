import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ManagementPage from './pages/ManagementPage'
import AboutPage from './pages/AboutPage'
import EmployeesPage from './pages/EmployeesPage.jsx'
import FAQPage from './pages/FAQPage'
import UserPage from './pages/UserPage.jsx'
import NotFound from './components/NotFound.jsx'

function App() {
  return (
    <Router>
      <div className="container-fluid p-0">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer className="footer" />
      </div>
    </Router>
  );
}

export default App;