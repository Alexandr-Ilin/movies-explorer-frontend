import './Register.css';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <main>
      <section className="register-page">
        <Logo />
        <h1 className="register-page__title">Добро пожаловать!</h1>
        <form className="form-register" onSubmit={onSubmit}>
          <label className="form-login__label" htmlFor="name">
            Имя
            <input
              name="name"
              id="name"
              className="form-login__input"
              type="text"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form-login__error">name-error</span>
          </label>
          <label className="form-register__label" htmlFor="Email">
            Email
            <input
              id="Email"
              name="Email"
              className="form-register__input"
              type="Email"
              required
            />
            <span className="form-register__error">Email-error</span>
          </label>
          <label className="form-register__label" htmlFor="password">
            Пароль
            <input
              id="password"
              name="password"
              className="form-register__input"
              type="password"
              minLength="2"
              maxLength="20"
              required
            />
            <span className="form-register__error">password-error</span>
          </label>
          <button type="submit" className="form-register__submit">Зарегистрироваться</button>
        </form>
        <p className="register-page__text">
          Уже зарегистрировались?
          <NavLink
            to="/signin"
            className="register-page__link"
          >
            Войти
          </NavLink>
        </p>
      </section>
    </main>
  );
}

export default Register;
