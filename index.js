const axios = require("axios");
const fs = require("fs");
require("dotenv").config();
const dayjs = require("dayjs");

const PROJECT = {
  continuidad_de_Aplicaciones_cr: 19,
  continuidad_de_Aplicaciones_gt: 24,
  continuidad_de_Aplicaciones_sv: 29,
  continuidad_de_Aplicaciones_ve: 34,
  Intelix: 66,
};

const ACTIVITY = {
  microservicios_caja_nueva: 240,
  caja_registradora_gt: 303,
  caja_registradora_sv: 359,
  caja_registradora_ve: 423,
  Feriado: 907,
};

const postActivities = () => {
  const url = process.env.X_HOST;
  const user = process.env.X_USER;
  const pass = process.env.X_PASS;

  // {
    //   begin: "2023-08-30T07:30:00",
    //   end: "2023-08-30T09:30:00",
    //   project: PROJECT["continuidad_de_Aplicaciones_cr"],
    //   activity: ACTIVITY["microservicios_caja_nueva"],
    //   description:
    //     "Integracion de features de validacion de insercion para desplegar en QA",
    //   tags: "Desarrollo",
    // },

  let activities = readTaskFromFile();

  for (let [key, value] of Object.entries(activities)) {
    let date = Object.keys(value)[0];
    let myb = dayjs(date+"T07:30:00")
    let body = {}
    let activityDay = []
    let begin = null
    let finish = null
    console.log(`Fecha inicial ${myb}`);
    for (let item of value[date]) {
      let task = item.split("-")
      begin = finish ? finish : myb;
      finish = begin.add(parseInt(task[2]), 'h')
      // body.begin = myb.format("YYYY-MM-DDTHH:mm:ss")
      console.log(`${begin.format("YYYY-MM-DDTHH:mm:ss")} - ${finish.format("YYYY-MM-DDTHH:mm:ss")}`)
    }
    console.log("========================\n")
  }

  // const listOfPromise = activities.map(
  //   (item) =>
  //     new Promise((resolve, reject) => {
  //       axios
  //         .post(url, JSON.stringify(item), {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-AUTH-USER": user,
  //             "X-AUTH-TOKEN": pass,
  //           },
  //         })
  //         .then(function (response) {
  //           resolve(response.data);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           reject(error);
  //         });
  //     })
  // );

  // Promise.all(listOfPromise)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const readTaskFromFile = () => {
  const lineByLine = require("n-readlines");
  const liner = new lineByLine("./tasks/task-done.txt");

  const finalTask = []
  let activitiesList = []
  let line;
  let spaceCount = 0;
  let dateExtracted
  console.log("Extrayendo datos de tareas")
  while ((line = liner.next())) {
    const stringDate = line.toString("utf8")
    if (stringDate.indexOf("[") > -1) {
      // Seteando lectura de tareas
      dateExtracted = stringDate.replace("[","").replace("]", "")
    } else {
      if (stringDate.length === 0) {
        if (spaceCount === 0) {
          spaceCount++
        } else {
          if (activitiesList.length > 0) {
            let body = {}
            body[dateExtracted] = Object.assign([], activitiesList);
            activitiesList = [];
            finalTask.push(body)
          }
        }
      } else if (stringDate !== ".") {
        activitiesList.push(stringDate)
      }
    }
  }

  console.log("Tareas a imprimir");
  return finalTask;
};

postActivities();
