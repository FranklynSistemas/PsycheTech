app.controller('rootController', function($scope, $rootScope, $http) {
  $scope.form = {}
  $rootScope.isAuth = false;
  $scope.sendFrom = function(form) {

    const url = '/createContact';

    if (!angular.equals(form, {})) {
      $http.post(url, form)
        .then(function(result) {
          swal(
            'Bien!',
            'Nos pondremos en contácto contigo lo más rapído posible!',
            'success'
          );
          $scope.form = {};
        }, function(err) {
          swal(
            'Opss!',
            'Paso algo malo con nuestro servidor :( intenta de nuevo o escribenos un correo',
            'error'
          );
        });
    } else {
      swal(
        'Opss!',
        'Debes llenar todos los campos ;) ',
        'error'
      );
    }

  }

  var $window = $(window);

  $window.on('load', function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    function statusChangeCallback(response) {
      console.log('response', response);
      if(response.status === 'connected') {
        $rootScope.isAuth = true;
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
  });


});
