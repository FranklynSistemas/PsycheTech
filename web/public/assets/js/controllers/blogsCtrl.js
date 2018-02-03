app.controller('blogsCtrl', function($scope, $routeParams, $http) {

  var articleName = $routeParams.name;
  var url = '/getArticles?name=' + articleName;
  $scope.article = {};
  $scope.status = {
    response: false,
    err: false
  };

  $scope.articles = [];

  function init() {

    getArticle();
    
  }

  function getArticle() {
    
    $http.get(url)
      .then(function(result) {
        if (result.data.status) {
          $scope.article = result.data.articles[0];
          $scope.status.response = true;
          getArticles();
        }
      }, function(err) {
        $scope.status.response = true;
        $scope.status.err = true;
      })
  }

  function getArticles() {
    
    var allArticles = '/getArticles?categorie=blog';

    $http.get(allArticles)
      .then(function(result) {
        if (result.data.status) {
          $scope.articles = cleanArticles(result.data.articles);
        }
      }, function(err) {
        console.log(err)
      })
  }

  function cleanArticles(articles) {
    var showArticles = []
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].name !== articleName) {
        showArticles.push(articles[i]);
      } 
    }

    return showArticles;
  }

  init();

});
