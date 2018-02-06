app.controller('rootController', function($scope, $http) {
  
  $scope.contacts = [];
  var url = '/getContacts';
  

  $http.get(url).
  then(function(result) {
    $scope.contacts = result.data.contacts;
    console.log($scope.contacts);
  }, function(error) {
     console.log(error);
  });

});
