import React, { Component } from 'react';

import { getEntriesData, getRoomsData, getRoomAvailability } from '../../services/BackendApi';

import { addZero } from '../../helpers/functions';

export default class EntryList extends Component {
  state = {
    entries: [],
    rooms: [],
    grbentries: [],
    lsentries: []
  }

  componentDidMount() {
    this.getroomAvailability(2);
    this.getroomAvailability(4);
    //setInterval(this.getroomAvailability.bind(this), 10000)
  }

  getroomAvailability(area_id) {
    getRoomAvailability(area_id)
        .then((response) => {
          //filtrera lediga rum?
          /*
          response.data.slice(0).forEach(element => {
            if(!element.availability){
              response.data.splice(response.data.indexOf(element), 1);
            }
          });
          */
        if (area_id == 2) {
          this.setState(() => ({
            grbentries: response.data
          }));
        }
        if (area_id == 4) {
          this.setState(() => ({
            lsentries: response.data
          }));
        }
          
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
    //Hämta aktuell och nästa timme
    var d = new Date();
    var currenthour = addZero(d.getHours());
    d.setHours(d.getHours() + 1 );
    var nextthour = addZero(d.getHours());
    return (
      <div className="Smartsign-content-wrapper">
        <div class="Smartsign-header-3">
          <div id="header3"><h3>Bokningsstatus / Bookingstatus ({currenthour} - {nextthour})</h3><h4>Grupprum / Group study rooms</h4></div>
        </div>
        <div id="grouproomentries">
            <div id="grouprooms" className="Smartsign-content-1"> 
            {
              this.state.grbentries.map(room => 
              <div className={"Smartsign-item flex-container " + room.status} key={room.room_name}>
                <div>
                {
                  room.room_number + ". " + room.room_name
                }
                </div>
              </div>
              )
            }
          </div>    
        </div>
        <div class="Smartsign-header-3">
          <div id="header4"><h4>Lässtudio / Reading Studio</h4></div>
        </div>
        <div id="readingstudioentries">
          <div id="grouprooms" className="Smartsign-content-1"> 
            {
              this.state.lsentries.map(room => 
              <div className={"Smartsign-item flex-container " + room.status} key={room.room_name}>
                <div>
                {
                  room.room_name
                }
                </div>
              </div>
              )
            }
          </div>   
        </div>
      </div>
    )
  }
}