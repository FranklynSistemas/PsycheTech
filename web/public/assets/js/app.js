var app = angular.module('PsycheTech', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "templates/home.html"
    })
    .when("/blog", {
      templateUrl: "templates/blog.html"
    })
    .when("/blog/psyche", {
      templateUrl: "templates/psychetech.html"
    })
    .when("/blog/psique", {
      templateUrl: "templates/psique.html"
    })
    .otherwise({
      redirectTo: "/"
    });
})