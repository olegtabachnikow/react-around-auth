import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, buttonText }) {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    function handleTitleChange(evt) {
        setTitle(evt.target.value);
    }  
    function handleUrlChange(evt) {
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
    >
      <input
        className="popup__input popup__input_value_title"
        id="title-input"
        type="text"
        name="title"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
        onChange={handleTitleChange}
      />
      <span className="popup__error_addCard-name popup__error title-input-error"></span>
      <input
        className="popup__input popup__input_value_url"
        id="url-input"
        type="url"
        name="url"
        placeholder="Image URL"
        required
        onChange={handleUrlChange}
      />
      <span className="popup__error_addCard-url popup__error url-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
