import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__container">
        <div className="about__project">
          <p className="about__project-title">Дипломный проект включал 5 этапов</p>
          <p className="about__project-text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__project">
          <p className="about__project-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about__project-text">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__container-duration">
        <div className="about__back-end-duration">
          <p className="about__time about__time_type_black">1 неделя</p>
          <p className="about__process">
            Back-end
          </p>
        </div>
        <div className="about__front-end-duration">
          <p className="about__time about__time_type_gray">
            4 недели
          </p>
          <p className="about__process">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
