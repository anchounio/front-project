import { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  const setUserRoleInLocalStorage = (value) => {
    if (!value) {
      localStorage.removeItem('role');
    } else {
      localStorage.setItem('role', value);
    }
    setUserRole(value);
  };

  return (
    <RoleContext.Provider value={[userRole, setUserRoleInLocalStorage]}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
