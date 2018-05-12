import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import store from "./store.js"
import Auth from 'j-toker';
import { Provider } from 'react-redux';
import ApiURL from './apiClient';

const API_ROOT = ApiURL();

Auth.configure({
  apiUrl:                 API_ROOT,
  signOutPath:           '/user/sign_out',
  emailSignInPath:       '/user/sign_in',
  emailRegistrationPath: '/user',
  accountUpdatePath:     '/user',
  accountDeletePath:     '/user',
  passwordResetPath:     '/user/password',
  passwordUpdatePath:    '/user/password',
  tokenValidationPath:   '/user/validate_token',
  confirmationSuccessUrl:  function() {
  return `${process.env.REACT_APP_URL}/confirm`;
  }
});


injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App store={store}/>
  </BrowserRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
