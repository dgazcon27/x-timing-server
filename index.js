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

  let activities = [
    {
      begin: "2023-09-11T07:30:00",
      end: "2023-09-11T09:30:00",
      project: PROJECT["continuidad_de_Aplicaciones_cr"],
      activity: ACTIVITY["microservicios_caja_nueva"],
      description:
        "Instalación y configuración de proyecto monitor y support-monitor-backend",
      tags: "Configuración",
    },
  ];

  const listOfPromise = activities.map(
    (item) =>
      new Promise((resolve, reject) => {
        axios
          .post(url, JSON.stringify(item), {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-USER": user,
              "X-AUTH-TOKEN": pass,
            },
          })
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      })
  );

  Promise.all(listOfPromise)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

postActivities();
