import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';
import { Link } from 'react-router-dom';
import { useRole } from '../../RoleContext';

import './ExerciseSearch.css';

const ExerciseSearch = () => {
  const [token] = useToken();
  const [userRole, setUserRole] = useRole();
  const [typology, setTypology] = useState('');
  const [muscular, setMuscular] = useState('');
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getExercises = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);
    console.log(userRole);
    console.log(token);

    // Si hay token nos interesa mandarlo para comprobar los exercises de los que somos dueños.
    const params = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};

    try {
      const res = await fetch(
        `http://localhost:4000/exercises?typology=${typology}&muscular=${muscular}`,
        params
      );

      const body = await res.json();

      console.log(body);

      if (body.status === 'error') {
        setExercises(null);
        setError(body.message);
        console.log(error);
      } else {
        setExercises(body.data.exercises);

        console.log(exercises);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getExercises();
  };

  const handleLike = async (e) => {
    setLoading(true);
    setError(null);

    e.target.classList.toggle('IsAnimating');

    const li = e.target.closest('li');

    const idExercise = li.getAttribute('data-id');

    try {
      const res = await fetch(
        `http://localhost:4000/exercises/${idExercise}/likes`,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
        }
      );

      const body = await res.json();

      if (body.status === 'error') {
        setError(body.message);
      } else {
        setUpdate(!update);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExercise = async (e) => {
    setLoading(true);
    setError(null);

    if (window.confirm('¿Deseas eliminar el ejercicio?')) {
      const li = e.target.closest('li');

      const idExercise = li.getAttribute('data-id');

      try {
        const res = await fetch(
          `http://localhost:4000/exercises/${idExercise}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          }
        );

        const body = await res.json();

        if (body.status === 'error') {
          setError(body.message);
        } else {
          setUpdate(!update);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de exercises.
  useEffect(() => {
    getExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <main className='ExerciseSearch'>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor='typology'>Tipología</label>
            <select
              name='typology'
              onChange={(e) => setTypology(e.target.value)}
            >
              <option value='' defaultValue></option>
              <option value='aerobico'>aerobico</option>
              <option value='anaerobico'>anaerobico</option>
              <option value='flexibilidad'>flexibilidad</option>
              <option value='resistencia'>resistencia</option>
            </select>
          </div>

          <div>
            <label htmlFor='muscular'>Grupo muscular</label>
            <select
              name='muscular'
              onChange={(e) => setMuscular(e.target.value)}
            >
              <option value='' defaultValue></option>
              <option value='brazos'>Brazos</option>
              <option value='piernas'>Piernas</option>
              <option value='espalda'>Espalda</option>
              <option value='pecho'>Pecho</option>
            </select>
          </div>
        </div>

        <button disabled={loading}>Buscar</button>
      </form>

      {error && <p className='Error'>{error}</p>}

      {exercises && (
        <ul className='ExerciseList'>
          {exercises.map((exercise) => {
            return (
              <li key={exercise.id} data-id={exercise.id}>
                <div>
                  <p>{exercise.name}</p>
                  {exercise.photo && (
                    <img
                      src={`http://localhost:4000/${exercise.photo}`}
                      alt='Imagen adjunta'
                    />
                  )}
                </div>
                <div>
                  <footer>
                    {token && (
                      <Link to={`/details/${exercise.id}`}>Detalles</Link>
                    )}
                  </footer>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default ExerciseSearch;
