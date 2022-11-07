import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from '../../utils/useForm';

function Register({ handleRegister }) {
  const {
    values, errors, handleChange, isValid,
  } = useForm();
  console.log(values);
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
              // disabled={!isEditing && true}
              required
            />
            <span className="form-register__error">
              {errors.nameRegister
                ? 'Буквы, цифры и дефис. От 2 до 30 символов.'
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
            <span className="form-register__error">{errors.EmailRegister ? 'Ведите адрес электронной почты' : ''}</span>
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
            <span className="form-register__error">{errors.password ? 'Пароль от 2 до 20 символов' : ''}</span>
          </label>
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
