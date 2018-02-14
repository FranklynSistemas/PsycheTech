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

app.controller('startCtrl', function($rootScope) {
  var $window = $(window);


  window.fbAsyncInit = function() {
    FB.init({
      appId: '293935774467795',
      cookie: true,
      xfbml: true,
      version: 'v2.12'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));



  $window.on('load', function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    function statusChangeCallback(response) {
      if (response.status === 'connected') {
        getUserInfo();
      }

      /*
        {
          status: 'connected',
          authResponse: {
              accessToken: '...',
              expiresIn:'...',
              signedRequest:'...',
              userID:'...'
          }
      }  
      */
    }

    function getUserInfo() {
      FB.api('/me?fields=id,name,picture,email', function(response) {
        $rootScope.$apply(function() {
          $rootScope.isAuth = true;
          $rootScope.user = response;
        });
      });

    }
  });
})
