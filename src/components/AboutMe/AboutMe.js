import './AboutMe.css';
import foto from '../../images/foto-min.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__container-text">
          <h1 className="about-me__header">Александр</h1>
          <p className="about-me__description-title">Фронтенд-разработчик, 41 год</p>
          {/* <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p> */}
          <div className="about-me__description">
            <p className="about-me__description-text">
              Выбрал разработку, потому что нравится логика и упорядоченные действия,
              мне нравится писать код.
            </p>
            <p className="about-me__description-text">
              Окончив курс обучения в Я.Практикум, продолжаю осваивать разработку.
              Изучаю Redux, TypeScript.
              Ищу дополнительную информацию на сайтах: https://stackoverflow.com, https://habr.com и т.д.
              На данный момент делается дизайн сайта-визитки (почти готов desktop-вариант).
              Этот сайт станет pet-проектом, который я планирую дальше развивать.
            </p>
            <p className="about-me__description-text">
              В свободное время хожу в спортзал и смотрю кино по выходным.
            </p>
          </div>
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
