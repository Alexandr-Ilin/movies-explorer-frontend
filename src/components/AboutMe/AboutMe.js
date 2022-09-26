import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import foto from '../../images/foto.png';

function AboutMe() {
  return (
    <section className="about-me">
      <SectionTitle
        title="Студент"
      />
      <div className="about-me__container">
        <div className="about-me__container-text">
          <h1 className="about-me__header">Виталий</h1>
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
