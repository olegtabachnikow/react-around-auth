import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  buttonText,
  isButtonDisabled,
  setIsButtonDisabled,
}) {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [isValid, setIsValid] = React.useState({ title: false, url: false });
  const [errors, setErrors] = React.useState({ title: "", url: "" });
  React.useEffect(() => {
    setErrors({});
    setTitle("");
    setUrl("");
    setIsButtonDisabled(true);
  }, [isOpen, setIsButtonDisabled]);

  React.useEffect(() => {
    Object.values(isValid).some((elem) => elem === false)
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [isValid, setIsButtonDisabled]);

  function handleTitleChange(evt) {
    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        title: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        title: false,
      });
    } else {
      setIsValid({
        ...isValid,
        title: true,
      });
      setErrors({
        ...errors,
        title: "",
      });
    }
    setTitle(evt.target.value);
  }
  function handleUrlChange(evt) {
    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        url: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        url: false,
      });
    } else {
      setIsValid({
        ...isValid,
        url: true,
      });
      setErrors({
        ...errors,
        url: "",
      });
    }
    setUrl(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: title,
      link: url,
    });
  }
  return (
    <PopupWithForm
      name="addCard"
      title="New place"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_title"
        id="title-input"
        type="text"
        name="title"
        placeholder="Title"
        minLength="2"
        maxLength="30"
        required
        value={title || ""}
        onChange={handleTitleChange}
      />
      <span
        className={`popup__error_addCard-name popup__error title-input-error ${
          isValid.title !== "" ? "popup__error_active" : ""
        }`}
      >
        {errors.title}
      </span>
      <input
        className="popup__input popup__input_value_url"
        id="url-input"
        type="url"
        name="url"
        placeholder="Image URL"
        minLength="2"
        required
        value={url || ""}
        onChange={handleUrlChange}
      />
      <span
        className={`popup__error_addCard-url popup__error url-input-error ${
          isValid.url !== "" ? "popup__error_active" : ""
        }`}
      >
        {errors.url}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
