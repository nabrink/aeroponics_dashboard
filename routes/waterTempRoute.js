#!/usr/bin/env node
'use strict';

const sensorSvc = require('../services/sensor_service');

let startDate = '2016-01-01 00:00:00.00000';
let endDate = '2016-12-31 23:59:59 99999';

module.exports = (app) => {
  app.get('/waterTemperature', (request, response) => {
    sensorSvc.getSensorData({type: 'a', start: startDate, end: endDate}, (err, data) => {
        if (err) {
          response.send(err);
        } else {
          response.send(data);
        }
    });
  });
};
