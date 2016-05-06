'use strict';

module.exports = (app) => {
  app.get('/humidity', (request, response) => {
    sensorSvc.getSensorData('c', startDate, endDate, (err, data) => {
        if (err) {
          response.send(err);
        } else {
          response.send(data);
        }
    });
  });
};
