import regsuccess from "../images/regsuccess.svg";
import regerror from "../images/regerror.svg";

function InfoTooltip ({isOpen, onClose, isSuccessful}) {
  return(
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info">
        <img className="popup__pic" alt={isSuccessful ? 'успешно' : 'ошибка'} src={isSuccessful ? regsuccess : regerror}/>
        <h2 className="popup__heading popup__heading_type_info">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} </h2>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </section>
  )
}

export default InfoTooltip;

