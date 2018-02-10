var app = angular.module('PsycheTech', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "templates/home.html"
    })
    .when("/blog", {
      templateUrl: "templates/blog.html",
      controller: "blogCtrl"
    })
    .when("/blogs/:name", {
      templateUrl: "templates/blogs.html",
      controller: "blogsCtrl"
    })
    .otherwise({
      redirectTo: "/"
    });
})
