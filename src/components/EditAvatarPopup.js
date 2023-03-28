import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-wrapper">
        <input
          type="url"
          className="popup__input popup__input_change-avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          id="avatar-url-input"
          ref={avatarRef}
        />
        <span className="avatar-url-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
