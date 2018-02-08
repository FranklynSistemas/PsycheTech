app.controller('blogCtrl', function($scope, $routeParams, $http) {

  var articleId = $routeParams.id;
  var url = '/getArticles?_id=' + articleId;
  $scope.article = {};
  $scope.status = {
    response: false,
    err: false
  };

  function init() {

    getArticle();

  }

  function getArticle() {

    $http.get(url)
      .then(function(result) {
        if (result.data.status) {
          $scope.article = result.data.articles[0];
          $scope.status.response = true;
        }
      }, function(err) {
        $scope.status.response = true;
        $scope.status.err = true;
      });
  }

  init();

});
