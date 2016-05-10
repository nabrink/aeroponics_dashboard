#!/usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config.js');

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
