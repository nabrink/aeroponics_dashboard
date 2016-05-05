'use strict';

exports.waterTempRoute = (app) => {
  app.get('/waterTemperature', (request, response) => {
    sensorSvc.getSensorData('a', startDate, endDate, (err, data) => {
        if (err) {
          response.send(err);
        } else {
          response.send(data);
        }
    });
  });
};
