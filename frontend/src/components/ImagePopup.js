function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_sec_img ${card._id && "popup_opened"}`}>
      <div className="popup__wrapper">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-title">{card.name}</p>
        <button className="popup__close-button" onClick={onClose} type="button"></button>
      </div>
    </section>
  );
}

export default ImagePopup;
