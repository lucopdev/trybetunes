import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/search.css';
import Loading from '../components/Loading';
import AlbumBoard from '../components/AlbumBoard';
// import Loading from '../components/Loading';
// import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      copyInputArtist: '',
      inputArtist: '',
      btnDisabled: true,
      albumData: [],
      hasResult: false,
      isLoading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    await searchAlbumsAPI();
    this.setState({
      isLoading: false,
    });
  }

  apiResult = async (event) => {
    event.preventDefault();
    const { inputArtist } = this.state;
    const albums = await searchAlbumsAPI(inputArtist);
    this.setState({
      copyInputArtist: inputArtist,
      albumData: albums,
      inputArtist: '',
      hasResult: true,
      btnDisabled: true,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.isInputLoginEmpty);
  };

  isInputLoginEmpty = () => {
    const { inputArtist } = this.state;
    const minLength = 2;
    if (inputArtist.length >= minLength) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  render() {
    const {
      copyInputArtist,
      inputArtist,
      btnDisabled,
      albumData,
      hasResult,
      isLoading,
    } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div className="page-search" data-testid="page-search">
        <Header />
        <AlbumBoard
          inputArtist={ inputArtist }
          btnDisabled={ btnDisabled }
          albumData={ albumData }
          hasResult={ hasResult }
          isLoading={ isLoading }
          onInputChange={ this.onInputChange }
          apiResult={ this.apiResult }
          copyInputArtist={ copyInputArtist }
        />
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
