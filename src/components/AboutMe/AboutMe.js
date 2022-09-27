import './AboutMe.css';
import foto from '../../images/foto.png';

function AboutMe() {
  return (
    <section className="about-me">
      <h1 className="about-me__title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__container-text">
          <h2 className="about-me__header">Виталий</h2>
          <p className="about-me__description-title">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Alexandr-Ilin"
            target="blank"
          >
            Github
          </a>
        </div>
        <img src={foto} className="about-me__foto" alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;
