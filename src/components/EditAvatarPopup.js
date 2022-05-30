import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputAvatarRef = React.useRef();
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="popup__input popup__input_value_url"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Image URL"
        required
        ref={inputAvatarRef}
      />
      <span className="popup__error_avatar-url popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
