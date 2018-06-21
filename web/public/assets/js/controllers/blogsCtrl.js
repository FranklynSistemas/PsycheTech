app.controller('blogsCtrl', function($scope, $rootScope, $routeParams, $timeout, $http) {

  var giveLike = false;
  var articleName = $routeParams.name;
  $scope.share = 'http://psychetech.co/blogs/' + articleName;
  var url = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/getArticles?name=' + articleName;
  $scope.article = {};
  $scope.status = {
    response: false,
    err: false
  };
  $scope.quali = {};

  $scope.articles = [];

  function initSocialShare() {
    $timeout(function() {
      $("#share").jsSocials("option", "text", $scope.article.shortView.text);
      $("#share").jsSocials("option", "url", $scope.share);
      $("#share").jsSocials("refresh");
    }, 200);
  }

  $scope.$on('$viewContentLoaded', function() {
    init();
  });

  function init() {
    getArticle();
  }

  function getArticle() {

    $http.get(url)
      .then(function(result) {
        if (result.data.status) {
          $scope.article = result.data.articles[0];
          $scope.comments = $scope.article.qualification.comments;
          $scope.status.response = true;
          initSocialShare();
          getArticles();
        }
      }, function(err) {
        $scope.status.response = true;
        $scope.status.err = true;
      })
  }

  function getArticles() {
    var allArticles = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/getArticles?categorie=blog&live=true';
    if ($scope.article.relations) {
      allArticles += '&relations=' + $scope.article.relations;
    }


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

  $scope.like = function() {
    if (!giveLike) {
      $scope.article.qualification.likes += 1;
      giveLike = true;
      updateQualification($scope.article.qualification);
    }
  }

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
    var url = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/updateQualification';
    $http.put(url, update).
    then(function(result) {
      $scope.quali.comment = "";
      $scope.article.qualification = result.data.qualification;
    })
  }

  function showMessage(info) {
    swal(
      info.title,
      info.msg,
      info.status
    );
  }

  $scope.sharer = function() {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: $scope.share,
      quote: $scope.article.shortView.text,
      mobile_iframe: true
    }, function(response) {});
  }

  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
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
      if (response.status === 'connected') {
        fetchUserDetail();
      } else {
        $rootScope.isAuth = false;
      }

    });
  }

  $scope.logout = function() {
    FB.logout(function(response) {
      if (response.status === 'unknown') {
        $rootScope.$apply(function() {
          $rootScope.isAuth = false;
          $rootScope.user = {}
        });
      }
    });
  }

});
