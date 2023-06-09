import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/album-board.css';
import Loading from './Loading';

class AlbumBoard extends React.Component {
  render() {
    const {
      copyInputArtist,
      inputArtist,
      btnDisabled,
      albumData,
      isLoading,
      onInputChange,
      apiResult,
      hasResult,
    } = this.props;
    const returnJSX = albumData.length > 0 ? (
      <section className="result-container">
        <p>
          Resultado de álbuns de:
          {' '}
          {copyInputArtist}
        </p>
        <div className="result-board">
          {
            albumData
              .map(({ collectionId, artistName, artworkUrl100, collectionName }) => (
                <Link
                  className="link-album"
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <div className="album-div">
                    <img
                      className="album-cover"
                      src={ artworkUrl100 }
                      alt="capa do disco"
                    />
                    <div className="name-collection-div">
                      <p>{artistName}</p>
                      <p>{collectionName}</p>
                    </div>
                  </div>
                </Link>
              ))
          }
        </div>
      </section>
    ) : 'Nenhum álbum foi encontrado.';

    if (isLoading) return <Loading />;

    return (
      <div>
        <section className="search-fieldset">
          <form>
            <label>
              Nome do artista
              <input
                data-testid="search-artist-input"
                type="text"
                name="inputArtist"
                value={ inputArtist }
                onChange={ onInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ apiResult }
            >
              Pesquisar
            </button>
          </form>
        </section>
        { hasResult ? returnJSX : ''}
      </div>
    );
  }
}

AlbumBoard.propTypes = {
  copyInputArtist: PropTypes.string.isRequired,
  inputArtist: PropTypes.string.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
  albumData: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  apiResult: PropTypes.func.isRequired,
  hasResult: PropTypes.bool.isRequired,
};

export default AlbumBoard;
