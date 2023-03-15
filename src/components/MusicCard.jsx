import React from 'react';
import PropTypes from 'prop-types';
import '../styles/music-card.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favourite: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.favouriteTrack(target));
  };

  favouriteTrack = (target) => {
    this.setState({
      loading: true,
    }, () => {
      const { musicData } = this.props;
      const findedMusic = musicData
        .find((track) => Number(target.className) === track.trackId);
      if (target.checked) {
        addSong(findedMusic);
      } else {
        removeSong(findedMusic);
      }
      this.setState({
        loading: false,
      }, this.recoveryFavorited());
    });
  };

  recoveryFavorited = () => {
    console.log(getFavoriteSongs());
  };

  render() {
    const { musicData } = this.props;
    const { loading, favourite } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="music-card">
        {musicData
          .map((track, index) => (
            <section className="track-section" key={ index }>
              <input
                name="favourite"
                value={ favourite }
                className={ track.trackId }
                data-testid={ `checkbox-music-${track.trackId}` }
                onChange={ this.onInputChange }
                type="checkbox"
              />
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
  musicData: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
