import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">
          &copy;
          {new Date().getFullYear()}
        </p>
        <ul className="footer__links-list">
          <li className="footer__links-item">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="blank">Яндекс.Практикум</a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link" href="https://github.com" target="blank">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
