var app = angular.module('PsycheTech', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "admin/templates/home.html",
      controller: "rootController"
    })
    .when("/blog", {
      templateUrl: "admin/templates/blogs.html",
      controller: "blogsCtrl"
    })
    .when("/blog/:id", {
      templateUrl: "admin/templates/blog.html",
      controller: "blogCtrl"
    })
    .otherwise({
      redirectTo: "/"
    });
});
