import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import './ExerciseCreate.css';

const ExerciseCreate = () => {
  const [token] = useToken();
  const [name, setName] = useState();
  const [typology, setTypology] = useState();
  const [muscularGroup, setMuscularGroup] = useState();
  const [description, setDescription] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      const res = await fetch('http://localhost:4000/exercises', {
        method: 'POST',
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
    <main className='ExerciseCreate'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='imagen'>Añade una imagen (opcional)</label>
        <input
          name='imagen'
          type='file'
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <label htmlFor='name'>Nombre</label>
        <input
          name='name'
          type='text'
          required
          maxLength={20}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label htmlFor='typology'>Tipología</label>
        <select
          name='typology'
          required
          onChange={(e) => setTypology(e.target.value)}
        >
          <option value='' defaultValue></option>
          <option value='aerobico'>aerobico</option>
          <option value='anaerobico'>anaerobico</option>
          <option value='flexibilidad'>flexibilidad</option>
          <option value='resistencia'>resistencia</option>
        </select>

        <label htmlFor='muscularGroup'>Grupo muscular</label>
        <select
          name='muscularGroup'
          required
          onChange={(e) => setMuscularGroup(e.target.value)}
        >
          <option value='' defaultValue></option>
          <option value='brazos'>Brazos</option>
          <option value='piernas'>Piernas</option>
          <option value='espalda'>Espalda</option>
          <option value='pecho'>Pecho</option>
        </select>

        <label htmlFor='descripcion'>Descripción</label>
        <textarea
          name='descripcion'
          value={description}
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

export default ExerciseCreate;
