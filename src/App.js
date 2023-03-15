import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './pages/Nav';
import './styles/app.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main className="main-app">
          <Nav />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
