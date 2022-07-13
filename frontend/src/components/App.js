import {useState, useEffect} from 'react';
import { Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { checkTokenAPI } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory()

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleTooltipOpen () {
    setIsInfoTooltipOpen(true);
  }

  function handleTooltipClose() {
    setIsInfoTooltipOpen(false)
    if (isRequestSuccessful) {
      history.push('/sign-in')
    }
  }
  function handleRequestOk() {
    setIsRequestSuccessful(true)
  }
  function handleRequestErr() {
    setIsRequestSuccessful(false)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };
  function handleCardClick (clickedCard) {
    setSelectedCard(clickedCard)
  }
  function handleSetCards (cards) {
    setCards(cards)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  useEffect (() => {
    api.getProfile()
    .then(res => {
      setCurrentUser(res)
    })
    .catch(error => {
      console.log(`Ошибка ${error}`)
    })
    api.getInitialCards()
    .then(res => {
      setCards(res);
    })
    .catch(error => {
      console.log(`Ошибка ${error}`)
    })
  }, [])
  function handleUpdateUser({name, about}) {
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res)
      })
      .then(() =>
        {closeAllPopups()}
      )
      .catch(error => {
        console.log(`Ошибка ${error}`)
      })

  }
  function handleUpdateAvatar ({avatar}) {
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() =>
        {closeAllPopups()}
      )
      .catch(error => {
        console.log(`Ошибка ${error}`)
      })

  }
  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(error => {
        console.log(`Ошибка ${error}`)
      })
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(error => {
        console.log(`Ошибка ${error}`)
      })
  }
  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name,link)
      .then(res => {
        setCards([res, ...cards])
      })
      .then(() =>
        {closeAllPopups()}
      )
      .catch(error => {
        console.log(`Ошибка ${error}`)
      })
  }

  function handleLoggedIn (email) {
    setUserEmail(email)
    setLoggedIn('true')
  }

  // function checkToken() {
  //   console.log('Начался checkToken');
  //   const token = localStorage.getItem('token')
  //   console.log('А вот это и есть token', token);
  //   if (token) {
  //     checkTokenAPI(token)
  //     .then((res) => {
  //       setUserEmail(res.email)
  //       setLoggedIn('true')
  //       history.push('/')
  //     })
  //     .catch(error => {
  //       console.log(`Ошибка ${error}`)
  //     })
  //   }
  // }

  // useEffect(() => {
  //   checkToken()
  // }, [])

  function signOut () {
    localStorage.removeItem('token');
    history.push('/sign-in')
  }

  return (
    <div className="page">
      <div className="page__container">

        <Switch>
          <Route path="/sign-in"><Login handleLoggedIn={handleLoggedIn}  handleTooltipOpen={handleTooltipOpen} handleRequestErr={handleRequestErr} /></Route>
          <Route path="/sign-up"><Register  handleTooltipOpen={handleTooltipOpen} handleRequestOk={handleRequestOk} handleRequestErr={handleRequestErr}/></Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <CurrentUserContext.Provider value={currentUser}>
                  <Header>
                    <nav>
                      <p className="header__text">{userEmail}</p>
                      <Link to="#" className="header__link" onClick={signOut}>Выйти</Link>
                    </nav>
                  </Header>
                  <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onSetCards={handleSetCards} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                  <Footer />

                  <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

                  <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

                  <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

                  <PopupWithForm name="removeConfirm" title="Вы уверены?" />

                  <ImagePopup card={selectedCard} onClose={closeAllPopups}/>


            </CurrentUserContext.Provider>
          </ProtectedRoute>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in"/> }
          </Route>
        </Switch>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={handleTooltipClose} isSuccessful={isRequestSuccessful}/>
      </div>
    </div>
  );
}

export default App;
