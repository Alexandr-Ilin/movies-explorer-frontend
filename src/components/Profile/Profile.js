import './Profile.css';
import React, { useContext } from 'react';
import Header from '../Header/Header';
import useForm from '../../utils/useForm';
import CurrentUserContext from '../../context/CurrentUserContext';

function Profile({
  signOut,
  isLogin,
  handleUpdateUser,
  isError,
  isEditing,
  editProfileButton,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values, errors, handleChange, setValues, isValid,
  } = useForm();

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        Email: currentUser.email,
      });
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values.Email, values.name);
    setValues({
      name: currentUser.name,
      Email: currentUser.email,
    });
  }
  function handleEditClick() {
    editProfileButton();
  }
  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className="main">
        <section className="profile-page">
          <h1 className="profile-page__title">{`Привет, ${currentUser.name}`}</h1>
          <form className="form-profile" onSubmit={handleSubmit}>
            <span className="form-profile__error form-profile__error_type_name">{errors.name ? 'Буквы, цифры и дефис. От 2 до 30 символов.' : ''}</span>
            <label htmlFor="name" className="form-profile__user-data">
              <p className="form-profile__input-name">Имя</p>
              <input
                id="name"
                name="name"
                className="form-profile__input"
                type="text"
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zа-яА-ЯёЁ0-9-\s]+$"
                required
                onChange={handleChange}
                value={values.name || ''}
                disabled={!isEditing && true}
              />
            </label>

            <label htmlFor="Email" className="form-profile__user-data">
              <p className="form-profile__input-name">E-mail</p>
              <input
                id="Email"
                name="Email"
                className="form-profile__input"
                type="Email"
                required
                onChange={handleChange}
                pattern="^(.+)@(.+)\.(.+)$"
                value={values.Email || ''}
                disabled={!isEditing && true}
              />
            </label>
            <span className="form-profile__error form-profile__error_type_email">{errors.Email ? 'Введите адрес электронной почты' : ''}</span>
            {isEditing && (
            <>
              <span className="form-profile__error-serv">{isError !== null ? isError.message : ''}</span>
              <button
                type="submit"
                className="form-profile__submit"
                disabled={
                  !isValid
                  || (currentUser.name === values.name && currentUser.email === values.Email)
                }
              >
                Сохранить
              </button>
            </>
            )}
          </form>
          {!isEditing && (
          <>
            <button type="button" onClick={handleEditClick} className="profile-page__edit">Редактировать</button>
            <button type="button" onClick={signOut} className="profile-page__signout">Выйти из аккаунта</button>
          </>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
