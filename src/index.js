import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RoleProvider } from './RoleContext';
import { BrowserRouter } from 'react-router-dom';
import { TokenProvider } from './TokenContext';
import { UserProvider } from './UserContext';
import { IdUserProvider } from './IdUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
    <RoleProvider>
      <IdUserProvider>
        <UserProvider>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </UserProvider>
      </IdUserProvider>
    </RoleProvider>
  </TokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
