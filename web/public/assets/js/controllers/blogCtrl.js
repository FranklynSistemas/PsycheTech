app.controller('blogCtrl', function($scope, $http) {

  var url = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/getArticles?categorie=blog&live=true';
  $scope.articles = [];

  $http.get(url)
    .then(function(result) {
      if (result.data.status) {
        $scope.articles = result.data.articles;
      }

    }, function(err) {

    })

});
