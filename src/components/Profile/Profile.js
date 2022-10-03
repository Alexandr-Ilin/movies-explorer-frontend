import './Profile.css';
import { useState } from 'react';
import Header from '../Header/Header';

function Profile({ signOut }) {
  const [isEditing, setIsEditing] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(!isEditing);
  }
  function handleEditClick() {
    setIsEditing(true);
  }
  return (
    <>
      <Header />
      <main>
        <section className="profile-page">
          <h1 className="profile-page__title">Привет, Виталий!</h1>
          <form className="form-profile" onSubmit={handleSubmit}>
            <span className="form-profile__error form-profile__error_type_name">name-error</span>
            <label htmlFor="name" className="form-profile__user-data">
              <p className="form-profile__input-name">Имя</p>
              <input
                id="name"
                name="name"
                className="form-profile__input"
                type="text"
                minLength="2"
                maxLength="30"
                required
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
              />
            </label>
            <span className="form-profile__error form-profile__error_type_email">Email-error</span>
            {isEditing && (
              <>
                <span className="form-profile__error-serv">serv-error</span>
                <button type="submit" className="form-profile__submit">Сохранить</button>
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
