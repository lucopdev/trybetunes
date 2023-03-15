import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/album.css';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicData: [],
      collectionData: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    this.getTrackList();
  }

  getTrackList = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const cpyData = data.slice();
    const cpySliced = cpyData.splice(1, cpyData.length);
    const cpySlicedCollection = cpyData.splice(0, 1);
    this.setState({
      musicData: cpySliced,
      collectionData: cpySlicedCollection,
    });
  };

  render() {
    const { musicData, collectionData } = this.state;
    return (
      <div className="album-page" data-testid="page-album">
        <Header />
        <div className="head-cover-container">
          <section className="head-cover">
            <h1 data-testid="album-name">{ collectionData[0]?.collectionName }</h1>
            <img
              className="cover-art"
              src={ collectionData[0]?.artworkUrl100 }
              alt="Capa"
            />
            <span data-testid="artist-name">
              { collectionData[0]?.artistName }
            </span>
          </section>
          <MusicCard musicData={ musicData } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
