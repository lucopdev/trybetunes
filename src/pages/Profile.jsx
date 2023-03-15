import React from 'react';
import Header from '../components/Header';
import '../styles/profile.css';

class Profile extends React.Component {
  render() {
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
