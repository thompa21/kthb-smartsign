import React, { Component } from 'react';

import { getEntriesData, getRoomsData, checkJWT } from '../../services/BackendApi';

export default class EntryList extends Component {
  state = {
    entries: [],
    rooms: []
  }

  componentDidMount() {
    getRoomsData()
        .then((response) => {
          this.setState(() => ({
            rooms: response.data
          }));
          getEntriesData()
            .then((response) => {
              console.log(this.state.rooms);
              //TODO Gå igenom response och hitta status för rum (som är lediga) för nuvarande timme
              var currententries = [];
              var currentdate = new Date();
              var currenthour = this.addZero(currentdate.getHours());
              response.data.forEach(element => {
                //console.log(this.converttimestamp(element.start_time));
                if (this.converttimestamp(element.start_time).substring(0,2) <= currenthour && this.converttimestamp(element.end_time).substring(0,2) > currenthour ) {
                  //console.log('match');
                  currententries.push(element);
                }
              });
              console.log(currententries);
              this.setState(() => ({
                entries: currententries
              }));
              var items = response.data
            })
            .catch((error) => {
              this.setState(() => ({ entries: error.response.data}));
            }); 
        })
        .catch((error) => {
          this.setState(() => ({ rooms: error.response.data}));
        });
    
  }

  addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }

  converttimestamp(timestamp){
    var date = new Date(timestamp * 1000);
    var hours = this.addZero(date.getHours());
    var minutes = this.addZero(date.getMinutes());
    var seconds = this.addZero(date.getSeconds());
    var formattedTime = hours + ':' + minutes;// + ':' + seconds;
    return formattedTime;
  }

  render() {
    return (
      <div className="Smartsign-content-1">
        { this.state.entries.map(entries => 
          <div key={entries.id}>
            {
              entries.room_name + ". " + this.converttimestamp(entries.start_time) + ". " + entries.name + ". " + entries.status + ". " + entries.type + ". "
            }
          </div>
          )
        }
      </div>
    )
  }
}