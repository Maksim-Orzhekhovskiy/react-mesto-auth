import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      name,
      job: description,
    });
  };

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input popup__input_change_name"
          name="name"
          placeholder="Имя"
          maxLength="40"
          minLength="2"
          required
          id="name-input"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="name-input-error popup__input-error"></span>
      </label>
      <label className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input popup__input_change_job"
          name="about"
          placeholder="Вид деятельности"
          maxLength="200"
          minLength="2"
          required
          id="job-input"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="job-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
