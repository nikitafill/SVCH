import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, unselectProduct, deleteProduct as deleteProductAction, updateProduct as updateProductAction, addProduct as addProductAction, selectProduct as selectProductAction, unselectProduct as unselectProductAction } from '../redux/actions';
import productsData from '../data/products.json';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import '../styles/ProductList.css';

const ProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const [showProductList, setShowProductList] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(setProducts(productsData));
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

  const handleAddProduct = (newProduct) => {
    dispatch(addProductAction(newProduct));
    closeAddModal();
  };

  const openEditModal = (product) => {
    dispatch(selectProductAction(product));
    setShowEditModal(true);
  };

  const deleteProduct = (productId) => {
    dispatch(deleteProductAction(productId));
    dispatch(unselectProductAction());
    setShowEditModal(false);
  };

  const updateProduct = (updatedProduct) => {
    dispatch(updateProductAction(updatedProduct));
    dispatch(unselectProductAction());
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