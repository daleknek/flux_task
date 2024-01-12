import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LocalContextProvider } from './components/LocalContext';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <LocalContextProvider>
      <App />
    </LocalContextProvider>
  </BrowserRouter>,
);
