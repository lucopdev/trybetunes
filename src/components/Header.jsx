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
    this.componentDidMount = this.componentDidMount.bind(this);
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
      <header className="header-component" data-testid="header-component">
        <section className="header-section">
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
          <h1
            className="user-name"
            data-testid="header-user-name"
          >
            {`Olá ${apiData.name}`}
          </h1>
        </section>
      </header>
    );
  }
}

export default Header;
