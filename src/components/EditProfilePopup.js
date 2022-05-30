import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {
    const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function handleNameChange(evt) {
      setName(evt.target.value);
  }  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
}  
function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
        name,
        about: description,
      });
}
React.useEffect (()=> {
    setName(currentUser.name);
    setDescription(currentUser.about);
},[currentUser]);


  return <PopupWithForm
  name="profile"
  title="Edit profile"
  isOpen={isOpen}
  buttonText={buttonText}
  onClose={onClose}
  onSubmit={handleSubmit}
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
  <span className="popup__error name-input-error"></span>
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
  <span className="popup__error_profile-about popup__error about-input-error"></span>
</PopupWithForm>
}
export default EditProfilePopup;