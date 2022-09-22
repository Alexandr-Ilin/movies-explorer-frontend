import './Promo.css';
import logoPath from '../../../images/logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#about" className="promo__link">Узнать больше</a>
      </div>
      <img src={logoPath} className="promo__logo" alt="Логотип проекта" />
    </section>
  );
}

export default Promo;
