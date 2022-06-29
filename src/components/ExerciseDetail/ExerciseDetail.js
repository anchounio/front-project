import { useState } from 'react';
import './ExerciseDetail.css';
import { Link } from 'react-router-dom';
import { useToken } from '../../TokenContext';

const ExerciseDetail = (idExercise) => {
  const [token] = useToken();
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(null);
  const [, setLoading] = useState(false);

  // const showExercise = async (idExercise) => {
  //   setLoading(true);

  //   // Vaciamos el error.
  //   setError(null);

  //   // Si hay token nos interesa mandarlo para comprobar los exercises de los que somos dueños.
  //   const params = token
  //     ? {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     : {};

  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/exercises?idExercise=${idExercise}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     const body = await res.json();

  //     console.log(body);

  //     if (body.status === 'error') {
  //       setExercises(null);
  //       setError(body.message);
  //       console.log(error);
  //     } else {
  //       setExercises(body.data.exercises);

  //       console.log(exercises);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Link to={`details/${idExercise}`}>
      <main className='ExerciseDetail'>
        {error && <p className='Error'>{error}</p>}
        <ul className='ExerciseList'>
          {exercises.map((exercise) => {
            return (
              <li key={exercise.id} data-id={exercise.id}>
                <div>
                  <p>{exercise.id}</p>
                  <p>{exercise.name}</p>
                  <p>{exercise.description}</p>
                  <p>{exercise.typology}</p>
                  <p>{exercise.muscularGroup}</p>
                  {exercise.photo && (
                    <img
                      src={`http://localhost:4000/${exercise.photo}`}
                      alt='Imagen adjunta'
                    />
                  )}
                  <p>{exercise.likes}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </Link>
  );
};

export default ExerciseDetail;
