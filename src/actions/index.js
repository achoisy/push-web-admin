import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  MSG_LIST,
  ACTIVE_ITEM,
  ADD_MESSAGE,
  MODAL_MESSAGE,
  AXIOS_ERROR,
  LOADING,
} from './types';

const ROOT_URL = 'http://localhost:3090';

const instance = axios.create({
  baseURL: 'http://localhost:3090/',
  timeout: 1000,
  headers: { authorization: localStorage.getItem('token') },
});

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function modaleMessage(msg, link) {
  return {
    type: MODAL_MESSAGE,
    payload: { msg, link },
  };
}

export function axiosError(msg) {
  return {
    type: AXIOS_ERROR,
    payload: msg,
  };
}

export function signoutUser() {
  localStorage.removeItem('token'); // remove token from browser
  return {
    type: UNAUTH_USER,
  };
}

export function loading(onOff) {
  return {
    type: LOADING,
    payload: onOff,
  };
}

export function setActiveItem({ name }, history) { // Menu routing
  switch (name) {
    case 'messages':
      history.push('/message');
      break;
    default:
      history.push(`/message/${name}`);
  }

  return {
    type: ACTIVE_ITEM,
    payload: name,
  };
}

export function signinUser({ login, password }, history) {
  return (dispatch) => { // redux-thunk
    axios.post(`${ROOT_URL}/signin`, { login, password })
      .then((res) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/message');
      })
      .catch(() => {
        const error = {
          status: true,
          msg: 'Identifiant ou mot de passe incorrect',
        };
        dispatch(authError(error));
      });
  };
}

export function fetchMessage() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/message`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((res) => {
        dispatch({
          type: MSG_LIST,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch(axiosError(err));
      });
  };
}

export function addMessage(newMessage) {
  return (dispatch, getState) => {
    instance.post('/message', newMessage)
      .then((res) => {
        console.log('res', res);
        dispatch(loading(false));
        dispatch(modaleMessage('Nouveau message cree et en attente de validation.', 'message'));
      })
      .catch((err) => {
        dispatch(loading(false));
        dispatch(modaleMessage(JSON.stringify(err), 'message/new'));
      });
  };
}
