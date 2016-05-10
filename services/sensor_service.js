#!/usr/bin/env node
'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.getSensorData = (searchParams, callback) => {
  let params = {
    TableName: process.env.SENSOR_DATA_TABLE,
    ProjectionExpression: '#ts, #t, #v',
    FilterExpression: '#ts between :start and :end and #t = :type',
    ExpressionAttributeNames: {
      '#ts': 'timestamp',
      '#t': 'type',
      '#v': 'value'
    },
    ExpressionAttributeValues: {
      ':start': searchParams.start,
      ':end': searchParams.end,
      ':type': searchParams.type
    }
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
      callback(err, null);
    } else {
      callback(null, jsonToCSV(data.Items));
    }
  });
};


function jsonToCSV(data) {
  let items = [];

  data.forEach(function (item) {
    let arrItem = [];
    arrItem.push(item.timestamp);
    arrItem.push(item.value);
    items.push(arrItem);
  });

  return items;
}
