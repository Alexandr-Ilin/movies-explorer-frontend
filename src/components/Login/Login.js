import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from '../../utils/useForm';

function Login({ handleLogin }) {
  const {
    values, errors, handleChange, isValid,
  } = useForm();

  function onSubmit(e) {
    e.preventDefault();
    handleLogin(values.EmailLogin, values.password);
  }

  return (
    <main className="main">
      <section className="login-page">
        <Logo />
        <h1 className="login-page__title">Рады видеть!</h1>
        <form className="form-login" onSubmit={onSubmit}>
          <label className="form-login__label" htmlFor="Email">
            Email
            <input
              id="Email"
              name="EmailLogin"
              className="form-login__input"
              onChange={handleChange}
              autoComplete="off"
              type="Email"
              pattern="^(.+)@(.+)\.(.+)$"
              value={values.EmailLogin || ''}
              required
            />
            <span className="form-login__error">{errors.EmailLogin ? 'Введите адрес электронной почты' : ''}</span>
          </label>
          <label className="form-login__label" htmlFor="password">
            Пароль
            <input
              id="password"
              name="password"
              className="form-login__input"
              type="password"
              minLength="2"
              maxLength="20"
              autoComplete="off"
              onChange={handleChange}
              value={values.password || ''}
              required
            />
            <span className="form-login__error">{errors.password ? 'Пароль от 2 до 20 символов' : ''}</span>
          </label>
          <button type="submit" className="form-login__submit" disabled={!isValid}>Войти</button>
        </form>
        <p className="login-page__text">
          Ещё не зарегистрированы?
          <Link
            to="/signup"
            className="login-page__link"
          >
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
