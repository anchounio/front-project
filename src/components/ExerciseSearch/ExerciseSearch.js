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

      if (!token) {
        setError('Es necesario estar logado para poder ver los ejercicios');
      } else if (body.status === 'error') {
        setExercises(null);
        setError(body.message);
        console.log(error);
      } else {
        setExercises(body.data.exercises);
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

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de exercises.
  useEffect(() => {
    getExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <main className='ExerciseSearch'>
      <h2>Filtrar por:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor='typology'>Tipología</label>
            <select
              name='typology'
              onChange={(e) => setTypology(e.target.value)}
            >
              <option value='' defaultValue></option>
              <option value='aerobico'>Aeróbico</option>
              <option value='anaerobico'>Anaeróbico</option>
              <option value='flexibilidad'>Flexibilidad</option>
              <option value='resistencia'>Resistencia</option>
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
        <ul className='ExerciseSearchList'>
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
