app.controller('blogsCtrl', function($scope, $rootScope, $routeParams, $http) {
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
          $scope.comments = $scope.article.qualification.comments;
          console.log("$scope.comments", $scope.comments)
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
    if ($rootScope.isAuth) {
      var comment = $scope.quali.comment;
      var comments = $scope.article.qualification.comments;
      var user = $rootScope.user;
      comments.push({
        userName: user.name,
        email: user.email,
        picture: user.picture.data.url,
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
      $scope.quali.comment = "";
      $scope.article.qualification = result.data;
    })
  }

  function showMessage(info) {
    swal(
      info.title,
      info.msg,
      info.status
    );
  }

  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      console.log('response', response)
      if (response.status === 'connected') {
        fetchUserDetail();
      } else {
        initiateFBLogin();
      }
    });
  }

  function fetchUserDetail() {
    FB.api('/me?fields=id,name,picture,email', function(response) {
      
      $rootScope.$apply(function() {
        $rootScope.isAuth = true;
        $rootScope.user = response;
        console.log('Successful login for: ', response);
      });
    });
  }

  function initiateFBLogin() {
    FB.login(function(response) {
      if (response.status !== 'connected') {
        fetchUserDetail();
      } else {
        $rootScope.isAuth = false;
      }

    });
  }
});
