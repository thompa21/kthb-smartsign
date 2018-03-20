import axios from 'axios';

const apiUrl = 'https://apps.lib.kth.se/webservices/';

function getEntriesData() {
    var startofday = new Date();
    startofday.setHours(0,0,0,0);
    var endofday = new Date();
    endofday.setHours(23,59,59,0);
    const url = apiUrl + 'mrbs/api/v1/noauth/entries/?limit=1000&area_id=2&fromDate=' + startofday.getTime()/1000 + '&toDate=' + endofday.getTime()/1000;
    return axios.get(url);
}

function getRoomsData() {
    const url = apiUrl + 'mrbs/api/v1/noauth/rooms/?limit=1000&area_id=2';
    return axios.get(url);
}

function getRoomAvailability(area_id) {
    var currenttimestamp = Math.floor(Date.now() /1000);
    const url = apiUrl + 'mrbs/api/v1/noauth/roomsavailability/?timestamp=' + currenttimestamp + '&limit=1000&area_id=' + area_id;
    return axios.get(url);
}

export {getEntriesData, getRoomsData, getRoomAvailability};