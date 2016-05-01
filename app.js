'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var sensorSvc = require('./services/sensor_service');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/temperature_data', function (request, response) {
  sensorSvc.getSensorData('b',
                          '2016-05-01 00:00:00.00000',
                          '2016-05-01 23:59:59 99999', function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

app.get('/waterlevel_data', function (request, response) {
  sensorSvc.getSensorData('d',
                          '2016-05-01 00:00:00.00000',
                          '2016-05-01 23:59:59 99999', function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

app.get('/humidity_data', function (request, response) {
  sensorSvc.getSensorData('c',
                          '2016-05-01 00:00:00.00000',
                          '2016-05-01 23:59:59 99999', function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

io.on('connection', function (socket) {
  socket.on('disconnect', function () {

  });
});

http.listen(app.get('port'), function () {
  console.log('Listening on *:' + app.get('port'));
});
