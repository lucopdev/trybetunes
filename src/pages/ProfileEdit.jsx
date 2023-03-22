import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Forms from '../components/Forms';
import '../styles/edit-profile.css';

class ProfileEdit extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="profile-edit-page" data-testid="page-profile-edit">
        <Header />
        <h1>Editar perfil</h1>
        <Forms history={ history } />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
