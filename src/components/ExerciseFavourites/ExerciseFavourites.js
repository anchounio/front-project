import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';
import { Link } from 'react-router-dom';
import { useIdUser } from '../../IdUserContext';

import './ExerciseFavourites.css';

const ExerciseFavourites = () => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(null);
  const [idUser, setIdUser] = useIdUser();

  const getFavExercises = async () => {
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
        `http://localhost:4000/exercises/${idUser}/favourites`,
        params
      );

      const body = await res.json();

      if (body.status === 'error') {
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

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de exercises.
  useEffect(() => {
    getFavExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='ExerciseFavourites'>
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

export default ExerciseFavourites;
