import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/Alexandr-Ilin/how-to-learn"
            target="blank"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/Alexandr-Ilin/russian-travel"
            target="blank"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/Alexandr-Ilin/react-mesto-api-full"
            target="blank"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
