app.controller('blogCtrl', function($scope, $http) {
  const baseUrl = 'https://api.psychetech.co'
  const url = baseUrl + '/getArticles?categorie=blog&live=true';
  $scope.articles = [];
  $scope.loading = true;

  $http.get(url)
    .then(function(result) {
      $scope.loading = false;
      if (result.data.status) {
        $scope.articles = result.data.articles;
      }

    }, function(err) {
      $scope.loading = false;
    })

});
