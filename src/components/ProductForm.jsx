import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import '../styles/ProductList.css';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setProducts(productsData);
    setTimeout(() => {
      setShowProductList(true);
    }, 100);
  }, []);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    closeAddModal();
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    setShowEditModal(false);
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setShowEditModal(false);
  };

  return (
    <div>
      <button className="add-product-button" onClick={openAddModal}>
        <strong>Добавить продукцию</strong>
      </button>
      <ul className={`product-list ${showProductList ? 'show' : ''}`}>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              onClick={() => openEditModal(product)}
              style={{ cursor: 'pointer' }}
              title="Редактировать"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Язык: {product.language}</p>
              <button onClick={() => deleteProduct(product.id)} className="delete-button"><strong>Удалить</strong></button>
            </div>
          </li>
        ))}
      </ul>
      {showAddModal && <ModalAdd onClose={closeAddModal} onAddProduct={handleAddProduct} />}
      {showEditModal && (
        <ModalUpdate
          show={true}
          onClose={() => setShowEditModal(false)}
          product={selectedProduct}
          deleteProduct={deleteProduct}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};

export default ProductForm;