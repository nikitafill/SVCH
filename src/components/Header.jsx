import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { clearUserData, setUserData } from '../redux/actions';

const Header = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        dispatch(setUserData({ id: decodedToken.id, username: decodedToken.username, email: decodedToken.email, image: 'https://placehold.co/600x400/EEE/31343C', about: decodedToken.about, profession: decodedToken.profession }));
      }
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false)
    dispatch(clearUserData());
  };

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
          {isAuthenticated && (
            <li>
              <Link to="/management">Управление продукцией</Link>
            </li>
          )}
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/employees">Сотрудники</Link>
              </li>
              <li>
                <Link to="/about">О нас</Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/auth">Войти</Link>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/user">Профиль</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>Выйти</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;