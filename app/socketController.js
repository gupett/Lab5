/* jslint node: true */
"use strict";

var model = require('./model.js');

module.exports = function (socket, io) {


  // user joins room
  socket.on('join', function (req) {
    console.log(req);
    var name = req.name;
    var user = req.user;
    var room = model.findRoom(name);
    // room.addUser(user);
    socket.join(name);
    console.log('A user joined ' + name);
    io.to(name).emit('join', req);
    //room.addMessage(req.username + " joined the channel");
  });

  // user gets updated
  socket.on('update', function (req) {
    console.log(req);
    var roomName = req.room;

    var room = model.findRoom(roomName);
    console.log("update from socket" + req.update);
    //TODO: added message structure
    var newOrder = {'user': req.user,'type': req.type,'company': req.company,'amount': req.amount};
    room.addOrder(newOrder);
    // Send back the uppdated order list and trades

    io.to(roomName).emit('update', {orders: room.orders, trades: room.trades});

    console.log("message from socket controller");
    
    //var message = {'company': req.company, 'amount': req.amount, 'price': req.price};
    //room.addMessage(req.username + ": " + message);

    // Add the order to the order list of the room


  });

  // user leaves room
  socket.on('leave', function (req) {
    console.log(req);
    var name = req.name;
    var user = req.user;
    var room = model.findRoom(name);
    // room.removeUser(user);
    console.log('A user left ' + name);
    io.to(name).emit('leave', user);
  });

};
