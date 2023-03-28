import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onSubmit({
      name,
      link,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input popup__input_add_place-name"
          name="name"
          placeholder="Название"
          maxLength="30"
          minLength="2"
          required
          id="place-input"
          onChange={handleNameChange}
          value={name}
        />
        <span className="place-input-error popup__input-error"></span>
      </label>
      <label className="popup__input-wrapper">
        <input
          type="url"
          className="popup__input popup__input_add_place-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          id="place-url-input"
          onChange={handleLinkChange}
          value={link}
        />
        <span className="place-url-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
