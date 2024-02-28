import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, unselectProduct, deleteProduct as deleteProductAction, updateProduct as updateProductAction, addProduct as addProductAction, selectProduct as selectProductAction, unselectProduct as unselectProductAction } from '../redux/actions';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import '../styles/ProductList.css';
import axios from 'axios';

const ProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const [showProductList, setShowProductList] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    setTimeout(() => {
      setShowProductList(true);
    }, 100);
  }, [dispatch]);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);

      closeAddModal();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const openEditModal = (product) => {
    dispatch(selectProductAction(product));
    setShowEditModal(true);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/products/${productId}`);

      if (response.status === 204) {
        dispatch(deleteProductAction(productId));
        dispatch(unselectProductAction());
      } else {
        console.error('Error deleting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
    setShowEditModal(false);
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:3001/products/${updatedProduct.id}`, updatedProduct);

      dispatch(updateProductAction(response.data));
      dispatch(unselectProductAction());
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
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
          onClose={() => {
            dispatch(unselectProduct());
            setShowEditModal(false);
          }}
          product={selectedProduct}
          deleteProduct={deleteProduct}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};

export default ProductForm;