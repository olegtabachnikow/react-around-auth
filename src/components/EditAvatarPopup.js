import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText, setIsButtonDisabled, isButtonDisabled }) {
  const [isValid, setIsValid] = React.useState(true);
  const [error, setError] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  React.useEffect(() => {
    setIsButtonDisabled(true);
    setAvatar("");
    setIsValid(true);
  }, [isOpen, setIsButtonDisabled]);
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }
  function handleValidation(evt) {
    if (!evt.target.validity.valid) {
      setError(evt.target.validationMessage);
      setIsValid(false);
      setIsButtonDisabled(true);
    } else {
      setIsValid(true);
      setIsButtonDisabled(false);
    }
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_url"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Image URL"
        required
        value={avatar || ""}
        onChange={(evt) => {
          setAvatar(evt.target.value);
          handleValidation(evt);
        }}
      />
      <span
        className={`popup__error_avatar-url popup__error avatar-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {error}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
