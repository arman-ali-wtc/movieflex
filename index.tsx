import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found.");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
