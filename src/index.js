import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScreenContextProvider from './contexts/ScreenContext';

ReactDOM.render(
  <React.StrictMode>
    <ScreenContextProvider>
      <App />
    </ScreenContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

