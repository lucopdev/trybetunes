import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      btnDisabled: true,
    };

    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.isInputLoginEmpty);
  };

  isInputLoginEmpty = () => {
    const { inputName } = this.state;
    const minLength = 2;
    if (inputName.length >= minLength) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  render() {
    const { inputName, btnDisabled } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form onSubmit={ () => history.push('/search') }>
          <h1>Login</h1>
          <fieldset className="login-fieldset">
            <label>
              Nome do artista
              <input
                data-testid="search-artist-input"
                type="text"
                name="inputName"
                value={ inputName }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ () => createUser({ name: inputName }) }
            >
              Pesquisar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
