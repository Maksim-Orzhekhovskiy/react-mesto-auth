import NavBar from "./NavBar";
import logo from "../images/logo.svg";

function Header({ email, onLogOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип сайта" className="header__logo" />
      <NavBar email={email} onLogOut={onLogOut} />
    </header>
  );
}

export default Header;
