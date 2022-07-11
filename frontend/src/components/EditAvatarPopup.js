import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect} from 'react';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
  const avatarInputRef = useRef();
  useEffect(() => {
    avatarInputRef.current.value = ''
  }, [isOpen])
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })

  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" submitBtnText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input ref={avatarInputRef} className="popup__input popup__input_set_avatar" type="url" name="avatarLink" defaultValue="" placeholder="Ссылка на аватар" required />
      <span className="popup__error avatarLink-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup