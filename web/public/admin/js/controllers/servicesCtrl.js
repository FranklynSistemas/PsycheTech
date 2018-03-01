app.controller('servicesCtrl', function ($scope, $http) {
  var url = '/getServices'
  $scope.services = []

  $http.get(url)
    .then(function (result) {
      if (result.data.status) {
        $scope.services = result.data.services
      }
    }, function (err) {

    })
})
