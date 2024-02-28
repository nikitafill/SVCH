import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div>
      <h1 className={showTitle ? 'show-title' : ''}>Список продукции</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;