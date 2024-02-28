import React from 'react';
import './../styles/Footer.css';

const Footer = () => {
  return ( 
      <footer className="footer">
          <div className="footer_contact-info">
              <h3>Контакты</h3>
              <p>Email: email@mail.com</p>
              <p>Адрес: Могилев, ул. Антонова, 23</p>
              <p>Телефон: +375(12)345-67-89</p>
          </div>
  </footer>
   );
}

export default Footer;