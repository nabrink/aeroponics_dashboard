'use strict';

var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1'
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getSensorData = function (type, start, end, callback) {
  var params = {
    TableName: process.env.SENSOR_DATA_TABLE,
    ProjectionExpression: '#ts, #t, #v',
    FilterExpression: '#ts between :start and :end and #t = :type',
    ExpressionAttributeNames: {
      '#ts': 'timestamp',
      '#t': 'type',
      '#v': 'value'
    },
    ExpressionAttributeValues: {
      ':start': start,
      ':end': end,
      ':type': type
    }
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
      callback(err, null);
    } else {
      callback(null, jsonToCSV(data.Items));
    }
  });
};


function jsonToCSV(data) {
  var items = [];

  data.forEach(function (item) {
    var arrItem = [];
    arrItem.push(item.timestamp);
    arrItem.push(item.value);
    items.push(arrItem);
  });

  return items;
}
