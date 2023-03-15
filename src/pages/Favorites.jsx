import React from 'react';
import Header from '../components/Header';
import '../styles/favorites.css';

class Favorites extends React.Component {
  render() {
    return (
      <div className="favorites-page" data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
      </div>
    );
  }
}

export default Favorites;
