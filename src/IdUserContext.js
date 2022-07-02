import { createContext, useContext, useState } from 'react';

const IdUserContext = createContext(null);

export const IdUserProvider = ({ children }) => {
  const [idUser, setIdUser] = useState(
    JSON.parse(localStorage.getItem('idUser'))
  );

  const setIdUserInLocalStorage = (value) => {
    if (value) {
      localStorage.setItem('idUser', JSON.stringify(value));
    } else {
      localStorage.removeItem('idUser');
    }
    setIdUser(value);
  };

  return (
    <IdUserContext.Provider value={[idUser, setIdUserInLocalStorage]}>
      {children}
    </IdUserContext.Provider>
  );
};

export const useIdUser = () => {
  return useContext(IdUserContext);
};
