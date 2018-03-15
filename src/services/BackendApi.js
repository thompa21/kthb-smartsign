import axios from 'axios';
//import { getCookie } from '../utils/cookies';

const apiUrl = 'https://apps.lib.kth.se/webservices/';

function getEntriesData() {
    //läs cookie med JWT-token
    //var kthb_jwt = getCookie("kthb_jwt");
    
    var startofday = new Date();
    startofday.setHours(0,0,0,0);
    var endofday = new Date();
    endofday.setHours(23,59,59,0);

    const url = `${apiUrl}mrbs/api/v1/noauth/entries/?limit=1000&area_id=2&fromDate=${startofday.getTime()/1000}&toDate=${endofday.getTime()/1000}`;
    return axios.get(url);
}

function getRoomsData() {
    const url = `${apiUrl}mrbs/api/v1/noauth/rooms/?limit=1000&area_id=2}`;
    return axios.get(url);
}

function checkJWT() {
    //läs cookie med JWT-token
    //var kthb_jwt = getCookie("kthb_jwt");
    //const url = `${BASE_URL}/checkJWT?token=${kthb_jwt}`;
    //return axios.get(url);
}

export {getEntriesData, getRoomsData, checkJWT};