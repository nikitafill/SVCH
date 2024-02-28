import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct, unselectProduct, setProducts } from '../redux/actions';
import productsData from '../data/products.json';
import Modal from './Modal';
import '../styles/ProductList.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const [showProductList, setShowProductList] = useState(false);
  
    useEffect(() => {
      dispatch(setProducts(productsData));
      setTimeout(() => {
        setShowProductList(true);
      }, 100);
    }, [dispatch]);
  
    const openPopup = (product) => {
      dispatch(selectProduct(product));
    };
  
    const closePopup = () => {
      dispatch(unselectProduct());
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