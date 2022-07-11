import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="логотип" />
      {props.children}
    </header>
  );
}

export default Header;
