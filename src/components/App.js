import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

import error from "../images/error.svg";
import done from "../images/done.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const navigate = useNavigate();
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipImage, setinfoTooltipImage] = useState("");
  const [infoTooltipTitle, setInfoTooltipTitle] = useState("");

  function onLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
        setinfoTooltipImage(error);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function onRegister(email, password) {
    auth
      .registration(email, password)
      .then(() => {
        setinfoTooltipImage(done);
        setInfoTooltipTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setinfoTooltipImage(error);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    isLogged &&
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
  }, [isLogged]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in");
    setEmailName("");
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ваще беда с карточками: ${err} `));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            title="Выйти"
            route="*"
            onLogOut={onSignOut}
            email={emailName}
          />
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Login onLogin={onLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Register onRegister={onRegister} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <ProtectedRouteElement
                    component={Main}
                    isLogged={isLogged}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />
          <InfoTooltip
            image={infoTooltipImage}
            title={infoTooltipTitle}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
