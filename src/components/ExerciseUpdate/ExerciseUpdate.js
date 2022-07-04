import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import Select from 'react-select';
import './ExerciseUpdate.css';

const ExerciseUpdate = () => {
  const [exercise, setExercise] = useState('');
  const [token] = useToken();
  const [typologyOption, setTypologyOption] = useState('');
  const [muscularGroupOption, setMuscularGroupOption] = useState('');
  const [name, setName] = useState('');
  const [typology, setTypology] = useState('');
  const [muscularGroup, setMuscularGroup] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    showExercise();
    // showSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // En este primer fetch, sacamos los datos antiguos del ejercicios
  // a modificar. La idea es extraerlos para que se muestren como valores
  // por defecto modificables en el formulario.

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

      if (body.status === 'error') {
        setExercise(null);
        setError(body.message);
        console.log(error);
      } else {
        setExercise(body.data.exercise);
        setTypologyOption({
          value: body.data.exercise.typology,
          label: body.data.exercise.typology,
        });
        setMuscularGroupOption({
          value: body.data.exercise.muscularGroup,
          label: body.data.exercise.muscularGroup,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const typOptions = [
    { value: 'aerobico', label: 'aerobico' },
    { value: 'anaerobico', label: 'anaerobico' },
    { value: 'flexibilidad', label: 'flexibilidad' },
    { value: 'resistencia', label: 'resistencia' },
  ];

  const muscOptions = [
    { value: 'brazos', label: 'brazos' },
    { value: 'piernas', label: 'piernas' },
    { value: 'espalda', label: 'espalda' },
    { value: 'pecho', label: 'pecho' },
  ];

  const handleTypologySelect = (e) => {
    setTypology(e.value);
    setTypologyOption(e.value);
  };

  const handleMuscularGroupSelect = (e) => {
    setMuscularGroup(e.value);
    setMuscularGroupOption(e.value);
  };

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
        <label htmlFor='image'>Añade una imagen (opcional)</label>
        <input
          type='file'
          name='image'
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />

        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          name='name'
          maxLength={20}
          required
          defaultValue={exercise.name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label htmlFor='typology'>Tipología</label>

        <Select
          className='selector'
          placeholder={typologyOption.value}
          options={typOptions}
          onChange={handleTypologySelect}
        ></Select>

        <label htmlFor='muscularGroup'>Grupo muscular</label>

        <Select
          className='selector'
          placeholder={muscularGroupOption.value}
          options={muscOptions}
          onChange={handleMuscularGroupSelect}
        ></Select>

        <label htmlFor='descripcion'>Descripción</label>
        <textarea
          name='descripcion'
          defaultValue={exercise.description}
          maxLength={280}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={loading}>Enviar</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default ExerciseUpdate;
