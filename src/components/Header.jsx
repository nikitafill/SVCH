import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/products">Продукция</Link>
          </li>
          <li>
            <Link to="/management">Управление продукцией</Link>
          </li>
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li>
          <li>
            <Link to="/employees">Сотрудники</Link>
          </li>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>
            <Link to="/user">Профиль</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;