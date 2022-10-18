import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login({ handleLogin }) {
  function onSubmit(e) {
    e.preventDefault();
    handleLogin();
  }
  return (
    <main className="main">
      <section className="login-page">
        {/* <div className="login-page__wrapper"> */}
        <Logo />
        <h1 className="login-page__title">Рады видеть!</h1>
        <form className="form-login" onSubmit={onSubmit}>
          <label className="form-login__label" htmlFor="Email">
            Email
            <input
              id="Email"
              name="Email"
              className="form-login__input"
              type="Email"
              required
            />
            <span className="form-login__error">Email-error</span>
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
              required
            />
            <span className="form-login__error">password-error</span>
          </label>
          <button type="submit" className="form-login__submit">Войти</button>
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
        {/* </div> */}
      </section>
    </main>
  );
}

export default Login;
