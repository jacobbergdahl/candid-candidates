/*
  This project uses both react-redux and redux-persist. The Provider component belongs
  to react-redux, and PersistGate to redux-persist. The combination allows us to set
  up a global store, and retain it, should the user perform an action such as refreshing
  the page.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import configureStore from './app/store';
// I always use a normalize.css-file as a base for my styling.
import './normalize.css';
import './site.scss';
let { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);