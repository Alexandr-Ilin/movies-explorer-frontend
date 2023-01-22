import {
  ERROR_BAD_REQUEST,
  ERROR_FAILED_TO_FETCH,
  ERROR_CONFLICT,
  ERROR_UNAUTHORIZED,
  ERROR_SERVER,
  MESSAGE_CONFLICT,
  MESSAGE_FAILED_TO_FETCH,
  MESSAGE_UNAUTHORIZED,
  MESSAGE_UNAUTHORIZED_LOGIN,
  MESSAGE_SERVER_ERROR,
  MESSAGE_BAD_REQUEST,
} from './consts';

function alertErrorMessage(err, path) {
  if (err.message === ERROR_CONFLICT) {
    return { message: MESSAGE_CONFLICT };
  }
  if (err.message === ERROR_FAILED_TO_FETCH) {
    return { message: MESSAGE_FAILED_TO_FETCH };
  }
  if (err.message === ERROR_UNAUTHORIZED && path !== '/signin') {
    return { message: MESSAGE_UNAUTHORIZED };
  }
  if (err.message === ERROR_UNAUTHORIZED && path === '/signin') {
    return { message: MESSAGE_UNAUTHORIZED_LOGIN };
  }
  if (err.message === ERROR_SERVER) {
    return { message: MESSAGE_SERVER_ERROR };
  }
  if (err.message === ERROR_BAD_REQUEST) {
    return { message: MESSAGE_BAD_REQUEST };
  }
  return { message: err.message };
}

export default alertErrorMessage;
