'use strict';

exports.airTempRoute = (app) => {
  app.get('/airTemperature', (request, response) => {
    sensorSvc.getSensorData('b', startDate, endDate, (err, data) => {
        if (err) {
          response.send(err);
        } else {
          response.send(data);
        }
    });
  });
};
