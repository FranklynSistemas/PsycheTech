app.controller('blogsCtrl', function($scope, $rootScope, $routeParams, $http) {
  console.log($rootScope.isAuth)
  

  var isAuth = $rootScope.isAuth;
  var $window = $(window);
  var articleName = $routeParams.name;
  var url = '/getArticles?name=' + articleName;
  $scope.article = {};
  $scope.status = {
    response: false,
    err: false
  };
  $scope.quali = {};

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

  $scope.sendComment = function() {
    if (isAuth) {
      var comment = $scope.quali.comment;
      var comments = $scope.article.qualification.comments;
      comments.push({
        userName: 'Franklyn',
        comment: comment
      });
      $scope.article.qualification.comments = comments;
      updateQualification($scope.article.qualification);
    } else {
      showMessage({
        title: 'Ups!',
        msg: 'Antes debes ingresar con facebook',
        status: 'error'
      });
    }
  }

  function updateQualification(update) {
    var url = '/updateQualification';
    $http.put(url, update).
      then(function(result) {
        console.log(result.data);
      })
  }

  function showMessage(info) {
    swal(
      info.title,
      info.msg,
      info.status
    );
  }

  $window.on('load', function() {
    var finished_rendering = function() {
      console.log("finished rendering plugins");
      var spinner = document.getElementById("spinner");
      spinner.removeAttribute("style");
      spinner.removeChild(spinner.childNodes[0]);
    };

    FB.Event.subscribe('xfbml.render', finished_rendering);
  })

});
