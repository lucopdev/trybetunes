import React from 'react';
import PropTypes from 'prop-types';
import '../styles/music-card.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favoritedTracks: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const gettedFavoriteSongs = await getFavoriteSongs();
    this.setState({
      favoritedTracks: gettedFavoriteSongs,
      loading: false,
    });
  }

  // modificação
  favoriteTrack = async (song, id) => {
    const { favoritedTracks } = this.state;
    const { updateFavorites } = this.props;
    this.setState({
      loading: true,
    });
    if (favoritedTracks.some((fav) => fav.trackId === id)) {
      const newFavorite = favoritedTracks.filter((fav) => fav.trackId !== id);
      this.setState({ favoritedTracks: newFavorite });
      await removeSong(song);
      await updateFavorites();
    } else {
      this.setState((prevState) => ({
        favoritedTracks: [...prevState.favoritedTracks, song],
      }));
      await addSong(song);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { musicData } = this.props;
    const { loading, favoritedTracks } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="music-card">
        {musicData
          .map((track, index) => (
            <section className="track-section" key={ index }>
              <label>
                Favorita
                <input
                  name="isFavoriteSongs"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  onChange={ () => this.favoriteTrack(track, track.trackId) }
                  checked={ favoritedTracks.some((fav) => (
                    fav.trackId === track.trackId)) }
                  type="checkbox"
                />
              </label>
              <div className="head-track">
                <p className="track-name">{track.trackName}</p>
                <audio
                  className="audio-paddle"
                  data-testid="audio-component"
                  src={ track.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
              </div>
            </section>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  updateFavorites: PropTypes.func.isRequired,
  musicData: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
