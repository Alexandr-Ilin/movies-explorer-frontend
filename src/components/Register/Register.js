import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from '../../utils/useForm';
import {
  MESSAGE_VALIDATION_EMAIL,
  MESSAGE_VALIDATION_NAME,
  MESSAGE_VALIDATION_PASSWORD,
} from '../../utils/consts';

function Register({ handleRegister, isInfoMessage }) {
  const {
    values, errors, handleChange, isValid,
  } = useForm();
  function onSubmit(e) {
    e.preventDefault();
    handleRegister(values.nameRegister, values.EmailRegister, values.password);
  }
  return (
    <main className="main">
      <section className="register-page">
        <Logo />
        <h1 className="register-page__title">Добро пожаловать!</h1>
        <form className="form-register" onSubmit={onSubmit}>
          <label className="form-register__label" htmlFor="name">
            Имя
            <input
              name="nameRegister"
              // id="name"
              className="form-register__input"
              type="text"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={values.nameRegister || ''}
              pattern="^[A-Za-zа-яА-ЯёЁ0-9-\s]+$"
              required
            />
            <span className="form-register__error">
              {errors.nameRegister
                ? MESSAGE_VALIDATION_NAME
                : ''}
            </span>
          </label>
          <label className="form-register__label" htmlFor="Email">
            Email
            <input
              id="Email"
              name="EmailRegister"
              className="form-register__input"
              type="Email"
              onChange={handleChange}
              pattern="^(.+)@(.+)\.(.+)$"
              value={values.EmailRegister || ''}
              required
            />
            <span className="form-register__error">{errors.EmailRegister ? MESSAGE_VALIDATION_EMAIL : ''}</span>
          </label>
          <label className="form-register__label" htmlFor="password">
            Пароль
            <input
              id="password"
              name="password"
              className="form-register__input form-register__input_password"
              type="password"
              minLength="2"
              maxLength="20"
              onChange={handleChange}
              value={values.password || ''}
              required
            />
            <span className="form-register__error">{errors.password ? MESSAGE_VALIDATION_PASSWORD : ''}</span>
          </label>
          <span className="form-register__error-serv">{isInfoMessage ? isInfoMessage.message : ''}</span>
          <button type="submit" className="form-register__submit" disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <p className="register-page__text">
          Уже зарегистрированы?
          <Link
            to="/signin"
            className="register-page__link"
          >
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
