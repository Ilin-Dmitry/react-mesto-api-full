function PopupWithForm (props) {
    return (
        <section className={`popup  ${props.isOpen && 'popup_opened'}`}>
            <div className={`popup__container ${props.containerClassName}`}>
              <form className={`popup__form_sec_${props.name}`} method="post" name={`form${props.name}`} onSubmit={props.onSubmit} >
                  <h2 className={`popup__heading ${props.headingClassName}`}>{props.title}</h2>
                  {props.children}
                  <button className={`popup__submit-button popup__submit-button_type_create ${props.submitButtonHidden}`} type="submit">{props.submitBtnText}</button>
              </form>
              <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithForm;