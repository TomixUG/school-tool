// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
import { reactLocalStorage } from 'reactjs-localstorage';

function setLoginAuthCookies(data) {
  // cookies.set('token', data.data.login.token, { path: '/' });
  // cookies.set('refreshToken', data.data.login.refreshToken, { path: '/' });
  reactLocalStorage.set('token', data.data.login.token);
  reactLocalStorage.set('refreshToken', data.data.login.refreshToken);
}
function setRegisterAuthCookies(data) {
  // cookies.set('token', data.data.register.token, { path: '/' });
  // cookies.set('refreshToken', data.data.register.refreshToken, { path: '/' });
  reactLocalStorage.set('token', data.data.register.token);
  reactLocalStorage.set('refreshToken', data.data.register.refreshToken);
}
function setTokenCookie(data) {
  // cookies.set('token', data, { path: '/' });
  reactLocalStorage.set('token', data);
}
function setRefreshTokenCookie(data) {
  // cookies.set('refreshToken', data, { path: '/' });
  reactLocalStorage.set('refreshToken', data);
}

function getAuthCookies() {
  // return cookies.get('token');
  return reactLocalStorage.get('token');
}
function getRefreshTokenCookie() {
  // return cookies.get('refreshToken');
  return reactLocalStorage.get('refreshToken');
}
function removeAuthCookies() {
  // cookies.remove('refreshToken');
  // cookies.remove('token');
  reactLocalStorage.remove('refreshToken');
  reactLocalStorage.remove('token');
}
export default {
  setLoginAuthCookies,
  setRegisterAuthCookies,
  getAuthCookies,
  removeAuthCookies,
  getRefreshTokenCookie,
  setTokenCookie,
  setRefreshTokenCookie,
};
