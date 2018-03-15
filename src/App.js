import React, { Component } from 'react';
import logo from './logo.svg';
import kthlogo from './images/KTH_Logotyp_RGB_2013-2.svg';
import kthbhall from './images/libraryhall_1.jpg';
import './App.css';

import Entries from './mrbs/entries/Entries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Smartsign-header-image">
            <img src={kthbhall} className="" alt="logo" />
          </div>
          <div className="Smartsign-header-1">
            <h6>VÄLKOMMEN TILL / WELCOME TO</h6>
          </div>
          <div className="Smartsign-header-2">
            <h1>KTH Biblioteket</h1>
            <h1>KTH Library</h1>
          </div>
          <div className="Smartsign-header-3">
            <h3>Grupprum idag</h3>
          </div>
        </header>
        <Entries></Entries>
      </div>
    );
  }
}

export default App;
