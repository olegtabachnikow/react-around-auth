import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText, setIsButtonDisabled, isButtonDisabled }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isValid, setIsValid] = React.useState({ name: true, about: true });
  const [errors, setErrors] = React.useState({ name: "", about: "" });
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleNameChange(evt) {
    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        name: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        name: false,
      });
      setIsButtonDisabled(true);
    } else {
      setIsValid({
        ...isValid,
        name: true,
      });
      setErrors({
        ...errors,
        name: "",
      });
      setIsButtonDisabled(false);
    }
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        about: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        about: false,
      });
    } else {
      setIsValid({
        ...isValid,
        about: true,
      });
      setErrors({
        ...errors,
        about: "",
      });
    }
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setErrors({});
    setIsValid({});
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen, setIsButtonDisabled]);

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Your name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleNameChange}
        value={name || ""}
      />
      <span
        className={`popup__error name-input-error ${
          isValid.name !== "" ? "popup__error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        className="popup__input popup__input_value_about"
        id="about-input"
        type="text"
        name="about"
        placeholder="About me"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span
        className={`popup__error_profile-about popup__error about-input-error ${
          isValid.about !== "" ? "popup__error_active" : ""
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
