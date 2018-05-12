import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Auth from 'j-toker';
import ApiURL from './apiClient';
//import DotEnv from 'dotenv';
Enzyme.configure({
  adapter: new Adapter()
});

Auth.configure({
  apiUrl:                 ApiURL(),
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

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
//DotEnv.config({ path: '.env.test' });
