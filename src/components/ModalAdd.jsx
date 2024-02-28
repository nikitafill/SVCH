import React, { useState } from 'react';
import '../styles/ModalAdd.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions';

const ModalAdd = ({ onClose, onAddProduct }) => {
  const dispatch = useDispatch();
  const [show] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    type: '',
    weight: '',
    quality: 'Высокое',
    price: '',
    image: '',
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct));
    onClose();
  };
  
  return (
    <div className={`modal-add ${show ? 'show' : ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Название продукции"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Описание продукции"
          rows="4"
          style={{ width: '100%', maxWidth: '100%', resize: 'none' }}
        />
        <input
          type="text"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
          placeholder="Тип продукции"
        />
        <input
          type="text"
          name="lists"
          value={newProduct.lists}
          onChange={handleInputChange}
          placeholder="Количество листов"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Цена (р)"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Ссылка на изображение продукции"
        />
        <input
          type="text"
          name="language"
          value={newProduct.language}
          onChange={handleInputChange}
          placeholder="Язык перевода"
        />
        <button type="submit" className="submit-button"><strong>Добавить</strong></button>
        <button onClick={onClose} className="cancel-button"><strong>Отмена</strong></button>
      </form>
    </div>
  );
  
};

export default ModalAdd;