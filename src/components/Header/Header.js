import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Header.css';

const Header = () => {
  const [token, setToken] = useToken();
  const [username, setUsername] = useState();

  const userData = async () => {
    try {
      const res = await fetch('http://localhost:4000/users', {
        headers: {
          Authorization: token,
        },
      });

      const body = await res.json();

      if (body.status === 'ok') {
        setUsername(body.data.user.username);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (token) userData();

  return (
    <header>
      <h1>
        <p id='Cabecera'>Gimnasio Los Chapuceros</p>
        <NavLink to='/'>
          <img src='/logo.jpg' alt='logo' id='Logo' />
        </NavLink>
      </h1>
      <div className='Buttons'>
        {token && <p>@{username}</p>}
        {!token && (
          <div className='Button'>
            <NavLink to='/login'>Iniciar sesión</NavLink>
          </div>
        )}
        {!token && (
          <div className='Button'>
            <NavLink to='/signup'>Registrarse</NavLink>
          </div>
        )}
        {token && (
          <div className='Button'>
            <NavLink to='/new'>Nuevo ejercicio</NavLink>
          </div>
        )}
        {token && (
          <div className='Button' onClick={() => setToken(null)}>
            <p>Salir de sesión</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
