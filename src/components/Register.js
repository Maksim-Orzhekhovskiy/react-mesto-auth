import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
          autoComplete="off"
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePassword}
          required
          autoComplete="off"
        />
        <button className="login__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__question">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>{" "}
      </p>
    </section>
  );
}

export default Register;
