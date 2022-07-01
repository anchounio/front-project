import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { useRole } from '../../RoleContext';
import { useUser } from '../../UserContext';

import './Login.css';

const Login = () => {
  const [token, setToken] = useToken();
  const [userRole, setUserRole] = useRole();
  const [user, setUser] = useUser();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si estamos logueados redireccionamos a la página principal.
  if (token) return <Navigate to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    console.log(userRole);

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const body = await res.json();
      console.log(body);
      if (body.status === 'error') {
        setError(body.message);
      } else {
        setToken(body.data.token);
        setUserRole(body.data.role);
        //console.log(name);
        setUser(name);
        console.log(user);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='Login'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Usuario:</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='pass'>Contraseña:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Iniciar sesión</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default Login;
