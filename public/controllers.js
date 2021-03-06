var chattControllers = angular.module('chattControllers', []);

chattControllers.controller('listController', ['$scope', '$location',  'HttpService',
  function($scope, $location, http) {

    $scope.rooms = [];
    http.get("/roomList", function(data) {
      $scope.rooms = data.list;
    });
    $scope.redirect = function(room) {
      console.log("Trying to enter room : " + room.name);
      $location.hash("");
      $location.path('/room/' + room.name);
    };
  }
]);

chattControllers.controller('roomController', ['$scope', 'HttpService', '$routeParams', 'UserService',
  function($scope, http, $routeParams, user) {
    $scope.room = $routeParams.room;

    //TODO: added new input parameters
    $scope.mess = "";
    $scope.amount = "";
    $scope.type = "";

    $scope.orders = [];
    $scope.trades = [];

    // $scope.orders = ["always", "leaving", "from", "recieve", "me", "down"];
    http.get("/room/"+$scope.room, function(data) {

      //TODO trying to get orders
      console.log("message from get /room");
      console.log(data);
      $scope.orders = data.orders;
      $scope.trades = data.trades;
      console.log(data);
      socket.emit("join", {name:$scope.room, username: user.getName()});
    });
    var socket = io().connect();

    socket.on('update', function (data) {
      $scope.$apply(function(){
        console.log("update");
        console.log("Controller update")
        console.log(data);
       $scope.orders = data.orders;
       $scope.trades = data.trades;
      });
    });

    socket.on('join', function (data) {
      $scope.$apply(function(){
        console.log("join");
        console.log(data);
        //$scope.orders.push(data.username + " joined the channel");
      });
    });

    $scope.redirect = function(room) {
      console.log("Trying to enter room : " + room.name);
      $location.hash("");
      $location.path('/room/' + room.name);
    };

    $scope.done = function() {
      console.log("Reached done()");
      socket.emit("update", {room: $scope.room, company: $scope.mess, amount:$scope.amount, type: $scope.type, user:user.getName()});
      $scope.mess = "";
      $scope.amount = "";
      $scope.type = "";
    };

  }
]);


chattControllers.controller('aboutController', ['$scope',
  function($scope) {

  }
]);

chattControllers.controller('loginController', ['$scope', 'HttpService', '$location', 'UserService',
  function($scope, http, $location, user) {
    $scope.name = "";
    $scope.done = function() {
      console.log("Reached done()");
      http.post('setUser', {realname: $scope.name}, function(response) {
        user.setName($scope.name);
        $location.path('list');

      });
    };

  }
]);

chattControllers.controller('navigationController', ['$scope',  '$location',
  function($scope,  $location) {
    $scope.location = $location.path();

    // // This function should direct the user to the wanted page
    $scope.redirect = function(address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };

  }
]);
