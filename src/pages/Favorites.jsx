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
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  async componentDidUpdate() {
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  render() {
    const { favoritedSongs } = this.state;
    return (
      <div className="favorites-page" data-testid="page-favorites">
        <Header />
        <MusicCard musicData={ favoritedSongs } />
      </div>
    );
  }
}

export default Favorites;
