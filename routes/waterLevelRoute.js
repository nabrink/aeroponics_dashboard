'use strict';

exports.waterLevelRoute = (app) => {
  app.get('/waterlevel', (request, response) => {
    sensorSvc.getSensorData('d',startDate, endDate, (err, data) => {
        if (err) {
          response.send(err);
        } else {
          response.send(data);
        }
    });
  });
};
