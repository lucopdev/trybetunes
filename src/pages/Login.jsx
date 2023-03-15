import React from 'react';
import '../styles/login.css';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
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
    const minLength = 3;
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
      <div className="page-login" data-testid="page-login">
        <form className="page-login-form" onSubmit={ () => history.push('/search') }>
          <h1>TrybeTunes</h1>
          <h1>Login</h1>
          <fieldset className="login-fieldset">
            <label>
              Nome
              <input
                data-testid="login-name-input"
                type="text"
                name="inputName"
                value={ inputName }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              disabled={ btnDisabled }
              onClick={ () => createUser({ name: inputName }) }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
