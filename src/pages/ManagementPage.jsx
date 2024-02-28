import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import ProductForm from '../components/ProductForm';

const ManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [showTitle, setShowTitle] = useState(false);


  useEffect(() => {
    setProducts(productsData);
    setShowTitle(true);
  }, []);

  return (
    <div>
      <h1 className={showTitle ? 'show-title' : ''}>Управление продукцией</h1>
      <ProductForm/>  
    </div>
  );
};

export default ManagementPage;