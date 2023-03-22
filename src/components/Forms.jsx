import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

class Forms extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputImg: '',
    inputDescription: '',
    isButtonDisabled: true,
  };

  async componentDidMount() {
    const result = await getUser();

    this.setState({
      inputName: result.name,
      inputEmail: result.email,
      inputDescription: result.description,
      inputImg: result.image,
    }, this.handleErrors);
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.handleErrors);
  };

  handleErrors = () => {
    const { inputName, inputEmail, inputDescription, inputImg } = this.state;
    const errors = [
      !inputName.length,
      !inputEmail.length,
      !inputDescription.length,
      !inputImg.length,
    ];
    const noErrors = errors.every((error) => error === false);
    this.setState({
      isButtonDisabled: !noErrors,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { inputName, inputEmail, inputDescription, inputImg } = this.state;
    const user = {
      name: inputName,
      email: inputEmail,
      description: inputDescription,
      image: inputImg,
    };
    history.push('/profile');
    updateUser(user);
  };

  render() {
    const {
      inputName,
      inputEmail,
      inputImg,
      inputDescription,
      isButtonDisabled,
    } = this.state;
    return (
      <section>
        <form
          className="edit-profile-form"
        >
          <div>
            <img
              src={ inputImg }
              alt="profile-img"
            />
            <input
              data-testid="edit-input-image"
              type="text"
              name="inputImg"
              value={ inputImg }
              onChange={ this.onInputChange }
            />
          </div>
          <div>
            <span>
              Nome
            </span>
            <input
              type="text"
              name="inputName"
              value={ inputName }
              data-testid="edit-input-name"
              onChange={ this.onInputChange }
            />
          </div>
          <div>
            <span>
              Email
            </span>
            <input
              type="email"
              name="inputEmail"
              value={ inputEmail }
              data-testid="edit-input-email"
              onChange={ this.onInputChange }
            />
          </div>
          <div>
            <span>
              Descrição
            </span>
            <textarea
              type="text"
              name="inputDescription"
              value={ inputDescription }
              data-testid="edit-input-description"
              onChange={ this.onInputChange }
            />
          </div>
          <button
            data-testid="edit-button-save"
            onClick={ this.handleClick }
            disabled={ isButtonDisabled }
          >
            Salvar

          </button>
        </form>
      </section>
    );
  }
}

Forms.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Forms;
