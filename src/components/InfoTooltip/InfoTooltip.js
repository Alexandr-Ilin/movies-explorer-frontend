import './InfoTooltip.css';
import React from 'react';

import okPath from '../../images/ok.svg';
import errorPath from '../../images/error.svg';

function InfoTooltip({
  isOpen, result, onClose, isError,
}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup  ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
      aria-hidden="true"
    >
      <div className="popup__info-container">
        <img className="popup__info-image" src={isError ? errorPath : okPath} alt={result ? 'Успешно' : 'Что-то не так'} />
        <h2 className="popup__info-header">{result ? result.message : ''}</h2>
        {/* <h2 className="popup__info-header">;lklk;lk;lk</h2> */}
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно"
        />
      </div>
    </section>

  );
}

export default InfoTooltip;
