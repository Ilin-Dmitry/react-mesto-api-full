import {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const {name, about, avatar} = currentUser;
  console.log('currentUser => ', currentUser);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" style={{backgroundImage: `url(${avatar})`}} onClick={onEditAvatar} ></div>
        <div className="profile__info">
          <h1 className="profile__info-title">{name}</h1>
          <button className="profile__info-edit-button" onClick={onEditProfile} type="button"></button>
          <p className="profile__info-status">{about}</p>
        </div>
        <button className="profile__button" onClick={onAddPlace} type="button"></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          )
        }).reverse()}
      </section>
    </main>
  );
}

export default Main;
