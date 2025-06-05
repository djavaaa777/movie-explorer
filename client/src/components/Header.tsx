import { Link, useNavigate } from 'react-router-dom';

type functionalProps = {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginSuccess: () => void;
  isLogged: boolean;
  onLogout: () => void;
};

function Header(props: functionalProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">🎬 Movie Explorer</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          onChange={props.onSearch}
        />
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        {props.isLogged && <Link to="/favorites">Favorites</Link>}
        <Link to="/about">About</Link>
        {!props.isLogged ? (
          <Link to="/register">Register</Link>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
