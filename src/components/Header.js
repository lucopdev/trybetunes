import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      apiData: '',
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
    this.componentDidMount();
    const { apiData, loading } = this.state;

    return (
      <header data-testid="header-component">
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
        { loading ? <h2>Carregando...</h2> : (
          <h1 data-testid="header-user-name">{ apiData.name }</h1>) }
      </header>
    );
  }
}

export default Header;
