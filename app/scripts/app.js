'use strict';

angular.module('bingoApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game/:gameId', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
       .when('/board/:gameId/:boardId', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
