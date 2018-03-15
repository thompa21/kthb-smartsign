import React, { Component } from 'react';

import { getEntriesData, getRoomsData, getRoomAvailability } from '../../services/BackendApi';

export default class EntryList extends Component {
  state = {
    entries: [],
    rooms: [],
    currententries: []
  }

  componentDidMount() {
    getRoomAvailability(9)
      .then((response) => {
        this.setState(() => ({
          currententries: response.data
        }));
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
      { this.state.currententries.map(room => 
          <div key={room.room_name}>
            {
              room.room_number + ". " + room.room_name + ". "  + room.availability
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