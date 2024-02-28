import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct, unselectProduct, setProducts } from '../redux/actions';
import Modal from './Modal';
import '../styles/ProductList.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const [showProductList, setShowProductList] = useState(false);

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

  const openPopup = (product) => {
    dispatch(selectProduct(product));
  };

  const closePopup = () => {
    dispatch(unselectProduct());
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Product List', 10, 10);

    products.forEach((product, index) => {
      const yPosition = 20 + index * 40;

      pdf.text(`Name: ${product.name}`, 10, yPosition);
      pdf.text(`Type: ${product.type}`, 10, yPosition + 10);
      pdf.text(`Lists: ${product.lists}`, 10, yPosition + 20);
      pdf.text(`Price: $${product.price.toFixed(2)}`, 10, yPosition + 30);

      pdf.line(10, yPosition + 35, 200, yPosition + 35);
    });

    pdf.save('product-list.pdf');
  };


  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
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