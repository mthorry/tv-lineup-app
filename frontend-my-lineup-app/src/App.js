import React, { Component } from 'react';
import './App.css';
import SearchContainer from './components/search/SearchContainer'
import ShowContainer from './components/shows/ShowContainer'
import Nav from './components/Nav'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav}/>
        <Route path="/search" render={(props) => <SearchContainer {...props} /> } />
        <Route path="/shows" render={(props) => <ShowContainer {...props} /> } />
      </div>
    );
  }
}

export default App;
