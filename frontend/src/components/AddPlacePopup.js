import {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [newPlace, setNewPlace] = useState('')
  const [newPlaceLink, setNewPlaceLink] = useState('');

  useEffect(() => {
    setNewPlace('')
    setNewPlaceLink('')
  }, [isOpen])

  function handleChangeNewPlace(e) {
    setNewPlace(e.target.value)
  }

  function handleChangeNewPlaceLink(e) {
    setNewPlaceLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace({
      name: newPlace,
      link: newPlaceLink
    })
  }
  return(
    <PopupWithForm name="newPlace" title="Новое место" submitBtnText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_set_place" value={newPlace} onChange={handleChangeNewPlace} type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="popup__error place-error"></span>
      <input className="popup__input popup__input_set_link" value={newPlaceLink} onChange={handleChangeNewPlaceLink} type="url" name="link"  placeholder="Ссылка на картинку" required />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;