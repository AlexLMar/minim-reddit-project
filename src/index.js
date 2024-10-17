import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './app/App';
import './index.css';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
