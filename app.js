'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var sensorSvc = require('./services/sensor_service');

var startDate = '2016-01-01 00:00:00.00000';
var endDate = '2016-12-31 23:59:59 99999';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/waterTemperature', function (request, response) {
  sensorSvc.getSensorData('a', startDate, endDate, function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

app.get('/airTemperature', function (request, response) {
  sensorSvc.getSensorData('b', startDate, endDate, function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

app.get('/humidity', function (request, response) {
  sensorSvc.getSensorData('c', startDate, endDate, function (err, data) {
      if (err) {
        response.send(err);
      } else {
        response.send(data);
      }
  });
});

app.get('/waterlevel', function (request, response) {
  sensorSvc.getSensorData('d',startDate, endDate, function (err, data) {
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
