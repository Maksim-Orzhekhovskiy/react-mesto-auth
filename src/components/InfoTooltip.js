function InfoTooltip(props) {
  return (
    <div className={`popup  ${props.isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <img
          src={props.image}
          className="popup__info-tooltip"
          alt={props.title}
        />
        <h2 className="popup__info-tooltip-title">{props.title}</h2>

        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
