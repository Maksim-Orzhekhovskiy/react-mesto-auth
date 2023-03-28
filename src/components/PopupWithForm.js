import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_form_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit" type="submit" title="Сохранить">
            {props.buttonText}
          </button>
        </form>
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

export default PopupWithForm;
