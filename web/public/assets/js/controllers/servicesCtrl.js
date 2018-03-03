app.controller('servicesCtrl', function($scope, $http, $routeParams) {
  $scope.serviceName = $routeParams.serviceName

  var url = '/getServices?live=true&type=' + $scope.serviceName
  $scope.services = []

  function getServices() {
    $http.get(url)
    .then(function(result) {
      if (result.data.status) {
        $scope.services = result.data.services
        console.log("$scope.services", $scope.services)
      }
    }, function(err) {

    })
  }


  function init() {
    $scope.form = {
      typeVideoCall: '0',
      availability: '0'
    }
    getServices()
  }

  init()

  $scope.sendFrom = function(form) {
    const url = '/createContact'

    if (!angular.equals(form, {})) {
      form.type = $scope.serviceName
      $http.post(url, form)
        .then(function(result) {
          swal(
            'Bien!',
            'Nos pondremos en contácto contigo lo más rapído posible!',
            'success'
          )
          init()
        }, function(err) {
          swal(
            'Opss!',
            'Paso algo malo con nuestro servidor :( intenta de nuevo o escribenos un correo',
            'error'
          )
        })
    } else {
      swal(
        'Opss!',
        'Debes llenar todos los campos ;) ',
        'error'
      )
    }
  }
})
