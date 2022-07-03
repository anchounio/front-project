import { NavLink, useNavigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { useUser } from '../../UserContext';
import { useRole } from '../../RoleContext';
import { useIdUser } from '../../IdUserContext';

import './Header.css';

const Header = () => {
  const [user] = useUser();
  const [token, setToken] = useToken();
  const [userRole] = useRole();
  const [idUser, setIdUser] = useIdUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header>
      {token && <p className='Bienvenido'>Sesión iniciada como {user}</p>}
      <div className='Gym'>
        <NavLink to='/'>
          <h1 className='Cabecera'>MUSCLECARD GYM</h1>
        </NavLink>
        <NavLink to='/'>
          <img src='/logo.jpg' alt='logo' className='Logo' />
        </NavLink>
      </div>
      <div className='Buttons'>
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
        {token && userRole === 'admin' && (
          <div className='Button'>
            <NavLink to='/new'>Nuevo ejercicio</NavLink>
          </div>
        )}
        {token && (
          <div className='Button'>
            <NavLink to={`/favourites/${idUser}`}>Favoritos</NavLink>
          </div>

          // <Link to={`/update/${idExercise}`} className='Update'>
          // Actualizar
          // </Link>
        )}
        {token && (
          <div className='Button' onClick={logoutHandler}>
            <p>Salir de sesión</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
