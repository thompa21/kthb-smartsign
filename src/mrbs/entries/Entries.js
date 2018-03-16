import React, { Component } from 'react';

import { getEntriesData, getRoomsData, getRoomAvailability } from '../../services/BackendApi';

import { addZero } from '../../helpers/functions';

export default class EntryList extends Component {
  state = {
    entries: [],
    rooms: [],
    currententries: []
  }

  componentDidMount() {
    this.getroomAvailability();
    setInterval(this.getroomAvailability.bind(this), 10000)
  }

  getroomAvailability() {
    getRoomAvailability()
        .then((response) => {
          //filtrera lediga rum?
          response.data.slice(0).forEach(element => {
            if(!element.availability){
              response.data.splice(response.data.indexOf(element), 1);
            }
          });
          this.setState(() => ({
            currententries: response.data
          }));
        })
        .catch((error) => {
          this.setState(() => ({ rooms: error.response.data}));
        });
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
      { this.state.currententries.map(room => 
          <div className="Smartsign-item"  key={room.room_name}>
            {
              room.room_number + ". " + room.room_name
            }
          </div>
          )
        }
        { this.state.rooms.map(room => 
          <div key={room.id}>
            {
              room.room_number + ". "  + room.room_name
            }
          </div>
          )
        }
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