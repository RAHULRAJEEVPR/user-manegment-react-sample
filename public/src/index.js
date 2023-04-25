import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Store,persistor} from "./Redux/store";
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={Store}>
  <PersistGate loading={null} persistor={persistor}>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode>, */}
  </PersistGate>
  </Provider>,
  document.getElementById('root')
);

