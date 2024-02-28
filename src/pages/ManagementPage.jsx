import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';

const ManagementPage = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div>
      <h1 className={showTitle ? 'show-title' : ''}>Управление продукцией</h1>
      <ProductForm />
    </div>
  );
};

export default ManagementPage;