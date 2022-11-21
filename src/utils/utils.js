import {
  ERROR_BAD_REQUEST,
  ERROR_FAILED_TO_FETCH,
  ERROR_CONFLICT,
  ERROR_UNAUTHORIZED,
  ERROR_SERVER,
} from './consts';

function alertErrorMessage(err, path) {
  if (err.message === ERROR_CONFLICT) {
    return { message: 'Пользователь с таким email уже существует' };
  }
  if (err.message === ERROR_FAILED_TO_FETCH) {
    return { message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' };
  }
  if (err.message === ERROR_UNAUTHORIZED && path !== '/signin') {
    return { message: 'Вы не авторизованы.' };
  }
  if (err.message === ERROR_UNAUTHORIZED && path === '/signin') {
    return { message: 'Вы ввели неправильный логин или пароль.' };
  }
  if (err.message === ERROR_SERVER) {
    return { message: 'Ошибка сервера.' };
  }
  if (err.message === ERROR_BAD_REQUEST) {
    return { message: 'Введены некорректные данные.' };
  }
  return { message: err.message };
}

export default alertErrorMessage;
