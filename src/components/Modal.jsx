import React, { useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({ show, onClose, product }) => {
  useEffect(() => {
    const modalContainer = document.querySelector('.modal-container');
    if (show) {
      modalContainer.classList.add('modal-display-block');
    } else {
      modalContainer.classList.remove('modal-display-block');
    }
  }, [show]);

  return (
    <div className={`modal-container`}>
      <div className="modal-main">
        <button onClick={onClose} className="close">
          &times;
        </button>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <div className="description">
          <p>{product.description}</p>
          <p><strong>Тип:</strong> {product.type}</p>
          <p><strong>Цена:</strong> {product.price} р</p>
          <p><strong>Количество листов:</strong> {product.lists}</p>
          <p><strong>Язык:</strong> {product.language}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;