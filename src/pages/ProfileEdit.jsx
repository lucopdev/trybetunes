import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div className="profile-edit-page" data-testid="page-profile-edit">
        <Header />
        <h1>Profile Edit</h1>
      </div>
    );
  }
}

export default ProfileEdit;
