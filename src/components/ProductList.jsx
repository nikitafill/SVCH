import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import Modal from './Modal';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductList, setShowProductList] = useState(false);
  
    useEffect(() => {
      setProducts(productsData);
      setTimeout(() => {
        setShowProductList(true);
      }, 100);
    }, []);
  
    const openPopup = (product) => {
      setSelectedProduct(product); 
    };
  
    const closePopup = () => {
      setSelectedProduct(null);
    };
  
    return (
      <div>
        <ul className={`product-list ${showProductList ? 'show' : ''}`}>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => openPopup(product)}
                style={{ cursor: 'pointer' }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Язык: {product.language}</p>
              </div>
            </li>
          ))}
        </ul>
        {selectedProduct && (
          <Modal show={true} onClose={closePopup} product={selectedProduct} />
        )}
      </div>
    );
};
  
export default ProductList;