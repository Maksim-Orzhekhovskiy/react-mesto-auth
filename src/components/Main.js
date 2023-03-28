import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  function handleEditAvatarClick() {
    onEditAvatar();
  }
  function handleEditProfileClick() {
    onEditProfile();
  }
  function handleAddPlaceClick() {
    onAddPlace();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="content page__content">
        <section className="profile">
          <div className="profile__edit-block">
            <div className="profile__avatar-wrapper">
              <img
                src={currentUser.avatar}
                alt="Ваш аватар"
                className="profile__avatar"
              />
              <button
                className="profile__avatar-edit-button"
                onClick={handleEditAvatarClick}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__info-wrapper">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  aria-label="Редактировать"
                  onClick={handleEditProfileClick}
                ></button>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить"
            onClick={handleAddPlaceClick}
          ></button>
        </section>
        <section className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </section>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;
