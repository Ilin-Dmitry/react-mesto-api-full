import Header from "./Header";
import AuthForm from './AuthForm';
import {Link, useHistory} from 'react-router-dom';
import {loginAPI} from '../utils/Auth';

function Login ({handleLoggedIn, handleRequestErr, handleTooltipOpen}) {
  const history = useHistory();
  function handleLogin (email, password) {
    loginAPI(email, password)
    .then((res) => {
      console.log('res from fr Login.js =>', res, res.token);
      localStorage.setItem('token', res.token)
    })
    .then(() => {
      handleLoggedIn(email)
      history.push('/');
    })
    .catch(() => {
      handleRequestErr()
      handleTooltipOpen()
    })
  }
  return (
    <>
      <Header><Link to="/sign-up" className="header__link">Регистрация</Link></Header>
      <AuthForm heading="Вход" buttonName="Войти" onSubmit={handleLogin}></AuthForm>
    </>

  )
}

export default Login;