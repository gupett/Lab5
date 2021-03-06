/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var model = require("./model.js");

router.get('/roomlist', function (req, res) {
  var rooms = model.getRooms();
  var roomNames = [];
  for (var i = 0; i < rooms.length; i++) {
    roomNames.push(rooms[i]);
  }
  res.json({list:roomNames});
});

router.get('/room/:room', function (req, res) {
  // Lists which should be returned ont the get request
  var trades = model.findRoom(req.params.room).trades;
  var orders = model.findRoom(req.params.room).orders;

  res.json({orders: orders, trades: trades});
});

router.post('/setUser', function (req, res) {
  console.log("Set user in controller");
  res.json({name: "anon"});
});

module.exports = router;
