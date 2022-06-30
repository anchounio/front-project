import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import './ExerciseUpdate.css';

const ExerciseUpdate = () => {
  const [exercise, setExercise] = useState('');
  const [token] = useToken();
  const [name, setName] = useState('');
  const [typology, setTypology] = useState('');
  const [muscularGroup, setMuscularGroup] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  console.log('la typology es:' + exercise.typology);
  // En este primer fetch, sacamos los datos antiguos del ejercicios
  // a modificar. La idea es extraerlos para que se muestren como valores
  // por defecto modificables en el formulario.

  // const typOptions = [
  //   { value: '', label: '' },
  //   { value: 'aerobico', label: 'aerobico' },
  //   { value: 'anaerobico', label: 'anaerobico' },
  //   { value: 'flexibilidad', label: 'flexibilidad' },
  //   { value: 'resistencia', label: 'resistencia' },
  // ];

  // let typValue = {};
  // for (let i = 0; i < typOptions.length; i++) {
  //   console.log(typOptions[i]);
  //   if (typOptions[i].value === exercise.typology) {
  //     typValue = typOptions[i];
  //     console.log('se ha hecho!!!');
  //   }
  // }
  // console.log('soy atractivo');
  // console.log(typValue);

  const showExercise = async () => {
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
      const res = await fetch(`http://localhost:4000/exercises/${id}`, params);

      const body = await res.json();

      // console.log(body);

      if (body.status === 'error') {
        setExercise(null);
        setError(body.message);
        console.log(error);
      } else {
        setExercise(body.data.exercise);
        console.log(exercise);
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      // Si queremos enviar un body con formato "form/data" es necesario
      // crear un objeto de tipo FormData y "pushear" los elementos que queramos
      // enviar.
      const formData = new FormData();

      // Pusheamos las propiedades con append.
      formData.append('name', name);
      formData.append('typology', typology);
      formData.append('muscularGroup', muscularGroup);
      formData.append('description', description);
      formData.append('photo', selectedFile);

      const res = await fetch(`http://localhost:4000/exercises/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        setError(body.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Si no tenemos token o la petición ha ido bien redireccionamos
  // a la página principal.
  if (!token || success) return <Navigate to='/' />;

  return (
    <main className='ExerciseUpdate'>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          // defaultValue={exercise.photo}
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        {/* {selectedFile ? (
          <img
            src={`http://localhost:4000/${selectedFile}`}
            alt='Imagen adjunta'
          />
        ) : (
          <img
            src={`http://localhost:4000/${exercise.photo}`}
            alt='Imagen adjunta'
          />
        )} */}
        <input
          type='text'
          required
          defaultValue={exercise.name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* <Select
          // value={typology}
          options={typOptions}
          defaultValue={typValue}
          onChange={(e) => setTypology(e.value)}
        >
          {/* // defaultValue={exercise.typology}
          // name='typology' // required // onChange=
          {(e) => setTypology(e.target.value)}
          // > // <option value=''></option>
          // <option value='aerobico'>aerobico</option>
          // <option value='anaerobico'>anaerobico</option>
          // <option value='flexibilidad'>flexibilidad</option>
          // <option value='resistencia'>resistencia</option> */}
        {/* </Select> */}

        {exercise.typology === 'aerobico' && (
          <select
            name='typology'
            defaultValue={exercise.typology}
            required
            onChange={(e) => setTypology(e.target.value)}
          >
            <option value=''></option>
            <option value='aerobico' defaultValue>
              aerobico
            </option>
            <option value='anaerobico'>anaerobico</option>
            <option value='flexibilidad'>flexibilidad</option>
            <option value='resistencia'>resistencia</option>
          </select>
        )}

        {exercise.typology === 'anaerobico' && (
          <select
            name='typology'
            defaultValue={exercise.typology}
            required
            onChange={(e) => setTypology(e.target.value)}
          >
            <option value=''></option>
            <option value='aerobico'>aerobico</option>
            <option value='anaerobico' defaultValue>
              anaerobico
            </option>
            <option value='flexibilidad'>flexibilidad</option>
            <option value='resistencia'>resistencia</option>
          </select>
        )}

        {exercise.typology === 'flexibilidad' && (
          <select
            name='typology'
            defaultValue={exercise.typology}
            required
            onChange={(e) => setTypology(e.target.value)}
          >
            <option value=''></option>
            <option value='aerobico'>aerobico</option>
            <option value='anaerobico'>anaerobico</option>
            <option value='flexibilidad' defaultValue>
              flexibilidad
            </option>
            <option value='resistencia'>resistencia</option>
          </select>
        )}

        {exercise.typology === 'resistencia' && (
          <select
            name='typology'
            defaultValue={exercise.typology}
            required
            onChange={(e) => setTypology(e.target.value)}
          >
            <option value=''></option>
            <option value='aerobico'>aerobico</option>
            <option value='anaerobico'>anaerobico</option>
            <option value='flexibilidad'>flexibilidad</option>
            <option value='resistencia' defaultValue>
              resistencia
            </option>
          </select>
        )}

        {exercise.muscularGroup === 'brazos' && (
          <select
            name='muscularGroup'
            defaultValue={exercise.muscularGroup}
            required
            onChange={(e) => setMuscularGroup(e.target.value)}
          >
            <option value=''></option>
            <option value='brazos' defaultValue>
              Brazos
            </option>
            <option value='piernas'>Piernas</option>
            <option value='espalda' selected>
              Espalda
            </option>
            <option value='pecho'>Pecho</option>
          </select>
        )}

        {exercise.muscularGroup === 'piernas' && (
          <select
            name='muscularGroup'
            defaultValue={exercise.muscularGroup}
            required
            onChange={(e) => setMuscularGroup(e.target.value)}
          >
            <option value=''></option>
            <option value='brazos'>Brazos</option>
            <option value='piernas' defaultValue>
              Piernas
            </option>
            <option value='espalda' selected>
              Espalda
            </option>
            <option value='pecho'>Pecho</option>
          </select>
        )}

        {exercise.muscularGroup === 'espalda' && (
          <select
            name='muscularGroup'
            defaultValue={exercise.muscularGroup}
            required
            onChange={(e) => setMuscularGroup(e.target.value)}
          >
            <option value=''></option>
            <option value='brazos'>Brazos</option>
            <option value='piernas'>Piernas</option>
            <option value='espalda' defaultValue>
              Espalda
            </option>
            <option value='pecho'>Pecho</option>
          </select>
        )}

        {exercise.muscularGroup === 'pecho' && (
          <select
            name='muscularGroup'
            defaultValue={exercise.muscularGroup}
            required
            onChange={(e) => setMuscularGroup(e.target.value)}
          >
            <option value=''></option>
            <option value='brazos'>Brazos</option>
            <option value='piernas'>Piernas</option>
            <option value='espalda'>Espalda</option>
            <option value='pecho' defaultValue>
              Pecho
            </option>
          </select>
        )}

        {/* <input
          type='text'
          defaultValue={exercise.typology}
          onChange={(e) => {
            setTypology(e.target.value);
          }}
        />
        <input
          type='text'
          defaultValue={exercise.muscularGroup}
          onChange={(e) => {
            setMuscularGroup(e.target.value);
          }}
        /> */}
        <textarea
          // value={description}
          required
          defaultValue={exercise.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={loading}>Enviar</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default ExerciseUpdate;
