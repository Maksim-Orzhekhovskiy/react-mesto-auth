import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          value={email}
          placeholder="Email"
          type="email"
          onChange={handleEmail}
          required
        />
        <input
          className="login__input"
          value={password}
          placeholder="Пароль"
          type="password"
          autoComplete="on"
          onChange={handlePassword}
          required
        />
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
