import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/favorites.css';

class Favorites extends React.Component {
  state = {
    favoritedSongs: [],
  };

  async componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    const getAwait = await getFavoriteSongs();
    this.setState({ favoritedSongs: getAwait });
  };

  render() {
    const { favoritedSongs } = this.state;
    return (
      <div className="favorites-page" data-testid="page-favorites">
        <Header />
        <h1>Favoritas</h1>
        <MusicCard
          musicData={ favoritedSongs }
          updateFavorites={ this.updateFavorites }
        />
      </div>
    );
  }
}

export default Favorites;
