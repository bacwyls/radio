import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { App } from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
