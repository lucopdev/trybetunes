import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      apiData: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      apiData: data,
      loading: false,
    });
  }

  render() {
    const {
      loading,
      apiData,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <header className="header-section" data-testid="header-component">
        <Link
          className="link-nav"
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisa
        </Link>
        <Link
          className="link-nav"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favoritas
        </Link>
        <Link
          className="link-nav"
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil
        </Link>
        <div className="login-btn-div">
          <div className="user-name-div">
            <p
              className="user-name"
              data-testid="header-user-name"
            >
              {apiData.name}
            </p>
          </div>
          <Link
            className="link-p"
            to="/"
          >
            <div className="link-p-div">
              <p>Logout</p>
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
