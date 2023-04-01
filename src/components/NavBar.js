import { Link, useLocation } from "react-router-dom";

function NavBar({ email, onLogOut }) {
  const location = useLocation();
  function handleElementToggle() {
    if (location.pathname === "/sign-in") {
      return (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      );
    } else if (location.pathname === "/sign-up") {
      return (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      );
    } else {
      return (
        <>
          <p className="header__user-email">{email}</p>
          <button type="button" className="header__sign-out" onClick={onLogOut}>
            Выйти
          </button>
        </>
      );
    }
  }
  return <div className="header__nav">{handleElementToggle()}</div>;
}

export default NavBar;
