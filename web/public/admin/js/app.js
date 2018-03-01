var app = angular.module('PsycheTech', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'admin/templates/home.html',
      controller: 'rootController'
    })
    .when('/blogs', {
      templateUrl: 'admin/templates/blogs.html',
      controller: 'blogsCtrl'
    })
    .when('/blog/:id', {
      templateUrl: 'admin/templates/blog.html',
      controller: 'blogCtrl'
    })
    .when('/services', {
      templateUrl: 'admin/templates/services.html',
      controller: 'servicesCtrl'
    })
    .when('/service/:id', {
      templateUrl: 'admin/templates/service.html',
      controller: 'serviceCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
})
