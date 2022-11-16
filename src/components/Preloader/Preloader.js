import './Preloader.css';

function Preloader({ isPreloader }) {
  return (
    <div className={`preloader ${isPreloader ? 'preloader_active' : ''}`} aria-hidden="true">
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
}

export default Preloader;
