import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/profile.css';

class Profile extends React.Component {
  state = {
    apiData: [],
  };

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      apiData: data,
    });
  }

  render() {
    const { apiData } = this.state;
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        <div className="profile-area">
          <div className="page-profile-div">
            <img
              className="page-profile-img"
              data-testid="profile-image"
              src={ apiData.image }
              alt="User"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <p>{apiData.name}</p>
          <p>{apiData.email}</p>
          <p>{apiData.description}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
