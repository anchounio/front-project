import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { useUser } from '../../UserContext';

import './Header.css';

const Header = () => {
  const [user] = useUser();
  const [token, setToken] = useToken();

  return (
    <header>
      <h1 id='Cabecera'>Gimnasio Los Chapuceros</h1>
      <NavLink to='/'>
        <img src='/logo.jpg' alt='logo' id='Logo' />
      </NavLink>
      <div className='Buttons'>
        {token && <p>{user}</p>}
        {!token && (
          <div className='Button'>
            <NavLink to='/login'>Log In</NavLink>
          </div>
        )}
        {!token && (
          <div className='Button'>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        )}
        {token && (
          <div className='Button'>
            <NavLink to='/new'>Nuevo</NavLink>
          </div>
        )}
        {token && (
          <div className='Button' onClick={() => setToken(null)}>
            <p>Logout</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
