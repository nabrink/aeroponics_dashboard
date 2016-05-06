'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config.js');
const sensorSvc = require('./services/sensor_service');

let startDate = '2016-01-01 00:00:00.00000';
let endDate = '2016-12-31 23:59:59 99999';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

require('./routes/airTempRoute')(app);
require('./routes/waterTempRoute')(app);
require('./routes/humidityRoute')(app);
require('./routes/waterLevelRoute')(app);

io.on('connection', (socket) => {
  socket.on('disconnect', () => {

  });
});

http.listen(app.get('port'), () => {
  console.log('Listening on *:' + app.get('port'));
});
