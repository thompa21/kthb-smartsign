import React, { Component } from 'react';
import logo from './logo.svg';
import kthlogo from './images/KTH_Logotyp_RGB_2013-2.svg';
import kthbhall from './images/libraryhall_1.jpg';
import './App.css';

import Entries from './mrbs/entries/Entries';

import { addZero } from './helpers/functions';

class App extends Component {
  render() {
    var d = new Date();
    var currenthour = addZero(d.getHours());
    d.setHours(d.getHours() + 1 );
    var nextthour = addZero(d.getHours());
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img className="Smartsign-header-image" src={kthbhall} alt="logo" />
          </div>
          <div className="Smartsign-header-1">
            <h6>VÄLKOMMEN TILL / WELCOME TO</h6>
          </div>
          <div className="Smartsign-header-2">
            <h1>KTH Biblioteket</h1>
            <h1>KTH Library</h1>
          </div>
        </header>
        {
          <Entries></Entries>
        }
      </div>
    );
  }
}

export default App;
