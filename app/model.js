/* jslint node: true */
"use strict";

/**
 * A module that contains the main system object!
 * @module roomSystem
 */

var roomList = [];


/**
 * Creates a room with the given name.
 * @param {String} name - The name of the room.
 *
 */

// Lagt till pris
function Room(name) {
    this.name = name;
    this.messages = [];
    this.users = [];
    this.orders = [];
    this.trades = [];

    this.addMessage = function(message){
      this.messages.push(message);
    };

    this.addOrder = function(newOrder){
    // Check if the order can go through and remove the orders which will hapened
    // Comment

      for (var i = 0; i < this.orders.length; i++) {
      
        if (this.orders[i].company == newOrder.company && this.orders[i].type != newOrder.type){ // It is a match

          if(this.orders[i].amount < newOrder.amount){
            newOrder.amount = newOrder.amount - this.orders[i].amount;
            // Add the trade to the trade list
            this.trades = addTrade(this.orders[i], newOrder.user, this.trades);

            // Remove order from orders list
            this.orders = removeOrder(this.orders, this.orders[i]);

          }else if(this.orders[i].amount > newOrder.amount){
            this.orders[i].amount = this.orders[i].amount - newOrder.amount;
            // Add the tarde to the trade list
            this.trades = addTrade(newOrder, this.orders[i].user, this.trades);

            // Stop loopint over the array and do not add the new order to the order list
            return;
          }else{
            // Add the trade to the trade list
            this.trades = addTrade(this.orders[i], newOrder.user, this.trades);
            // Remove order from the orders list and add the order to the trades list
            this.orders = removeOrder(this.orders, this.orders[i]);
            return;
          }

        }

      }

    // For every order which happeneds add the trade to the trade list
    this.orders.push(newOrder);
  };
}


function removeOrder(orders, element) {
  const index = orders.indexOf(element);
  orders.splice(index, 1);
  return orders;
}

function addTrade(order, user, trades){
  if (order.type == 'buy'){
     var newTrade = new Trade(order.user, user, order.company, order.amount);
  }else{
     var newTrade = new Trade(user, order.user, order.company, order.amount);
  }
  trades.push(newTrade);
  return trades;
}

// Trade
function Trade(buyer, seller, company, amount){
  this.buyer = buyer;
  this.seller = seller;
  this.company = company;
  this.amount = amount;
}

// Order
function Order(user, type, company, amount){
  this.user = user;
  this.type = type;
  this.company = company;
  this.amount = amount;
}

/**
 * Creates a room with the given name.
 * @param {String} name - The name of the room.
 */
exports.addRoom = function (name) {
  var newRoom = new Room(name);
  roomList.push(newRoom);
};

/**
 * Returns all the Rooms.
 */
exports.getRooms = function() {
  return roomList;
};

/**
 * Removes the room object with the matching name.
 * @param {String} name - The name of the room.
 */
exports.removeRoom = function(name){
  for (var i = 0; i < roomList.length; i++) {
    var room = roomList[i];
    if (room.name === name) {
      roomList.splice(i, 1);
      room.remove();
      break;
    }
  }
};

/**
 * Return random numbers
 * @type {[type]}
 */
exports.getRandom = function () {
  console.log("RANDOM");
};

/**
 * Return the room object with the matching name.
 * @param {String} name - The name of the room.
 */
exports.findRoom = function(name) {
  for (var i = 0; i < roomList.length; i++) {
    if (roomList[i].name === name) {
      return roomList[i];
    }
  }
};
