import {useState, useEffect, useContext} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" submitBtnText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_set_name" value={name || ''}  onChange={handleChangeName} type="text" name="name"  placeholder="Введите имя" minLength="2" maxLength="40" required />
      <span className="popup__error name-error"></span>
      <input className="popup__input popup__input_set_status" type="text" name="status" value={description || ''} onChange={handleChangeDescription} placeholder="Введите статус" minLength="2" maxLength="200" required />
      <span className="popup__error status-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;