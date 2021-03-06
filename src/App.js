import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import ExerciseSearch from './components/ExerciseSearch/ExerciseSearch';
import ExerciseCreate from './components/ExerciseCreate/ExerciseCreate';
import ExerciseDetail from './components/ExerciseDetail/ExerciseDetail';
import ExerciseUpdate from './components/ExerciseUpdate/ExerciseUpdate';
import ExerciseFavourites from './components/ExerciseFavourites/ExerciseFavourites';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<ExerciseSearch />} />
        <Route path='/details/:id' element={<ExerciseDetail />} />
        <Route path='/update/:id' element={<ExerciseUpdate />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new' element={<ExerciseCreate />} />
        <Route path='*' element={<ExerciseSearch />} />
        <Route path='/favourites/:id' element={<ExerciseFavourites />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
