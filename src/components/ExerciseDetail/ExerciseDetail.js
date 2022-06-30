import { useState, useEffect } from 'react';
import './ExerciseDetail.css';
import { Link, useParams } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { useRole } from '../../RoleContext';

const ExerciseDetail = () => {
  const [token] = useToken();
  const [exercise, setExercise] = useState('');
  const [error, setError] = useState(null);
  const [, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  const [userRole] = useRole();

  const showExercise = async () => {
    setLoading(true);

    console.log(userRole);
    // Vaciamos el error.
    setError(null);

    console.log('init likes');
    console.log(exercise.likes);
    console.log('init favourites');
    console.log(exercise.favourites);

    // Si hay token nos interesa mandarlo para comprobar los exercises de los que somos dueños.
    const params = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};

    try {
      const res = await fetch(`http://localhost:4000/exercises/${id}`, params);

      const body = await res.json();

      // console.log(body);

      if (body.status === 'error') {
        setExercise(null);
        setError(body.message);
        console.log(error);
      } else {
        setExercise(body.data.exercise);
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
    showExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

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
        console.log('likes');
        console.log(exercise.likes);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFavourite = async (e) => {
    setLoading(true);
    setError(null);

    // e.target.classList.toggle('IsAnimating');

    const li = e.target.closest('li');

    const idExercise = li.getAttribute('data-id');

    try {
      const res = await fetch(
        `http://localhost:4000/exercises/${idExercise}/favourite`,
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
        console.log('favoritos');
        console.log(exercise.favourites);
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

  console.log('hola');

  return (
    <main className='ExerciseDetail'>
      <ul className='ExerciseList'>
        <li key={exercise.id} data-id={exercise.id}>
          <div>
            <p>Nombre: {exercise.name}</p>
            <p>Descripción: {exercise.description}</p>
            <p>Tipología: {exercise.typology}</p>
            <p>Grupo muscular: {exercise.muscularGroup}</p>
            {exercise.photo && (
              <img
                src={`http://localhost:4000/${exercise.photo}`}
                alt='Imagen adjunta'
              />
            )}
            <p>Likes: {exercise.likes}</p>
            <p>Favorito: {exercise.favourites}</p>
          </div>
          <footer>
            <div>
              <div
                className={`heart ${
                  token && exercise.likedByMe && 'IsAnimating'
                }`}
                onClick={token && handleLike}
              ></div>
              <p>{exercise.likes} likes</p>
            </div>
            <div className='favourites'>
              <button onClick={token && handleFavourite}>Favorito</button>
            </div>
            {token && userRole === 'admin' && (
              <button onClick={handleDeleteExercise}>Eliminar</button>
            )}
            {token && userRole === 'admin' && (
              <Link to={`/update/${exercise.id}`}>Actualizar</Link>
            )}
          </footer>
        </li>
      </ul>
    </main>
  );
};

export default ExerciseDetail;
