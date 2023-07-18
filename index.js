const axios = require("axios");
const moment = require('moment');

// {
//     "begin": "2023-07-18T11:30:00",
//     "end": "2023-07-18T13:30:00",
//     "project": 19,
//     "activity": 229,
//     "description": "Pruebas de desarrollo de modificacion de validacion de creacion de TR",
//     "tags": "string"
//   }
const postActivities = () => {
    var begin = moment('07:30:00', "hh:mm:ss")
    var next = begin.add(4, 'hour')
    // const activities = [
    //     "actividad 1",
    //     "actividad 2",
    //     "actividad 3"
    // ]
    // const activitiesList = activities.map(item =>{
    //     let end = m
    // })
    console.log(begin.format("YYYY-MM-DD[T]hh:mm:[00]"));
    console.log(begin.add(4, 'hour'));
}

postActivities()