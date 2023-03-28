import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup_type_open-image ${
        props.card ? "popup_opened" : ""
      } popup popup_dark_theme`}
    >
      <div className="popup__image-container">
        <div className="popup__image-wrapper">
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="popup__image"
          />
          <p className="popup__image-description">
            {props.card ? props.card.name : ""}
          </p>
        </div>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
