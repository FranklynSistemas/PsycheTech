app.controller('blogCtrl', function($scope, $routeParams, $location, $http) {

  var articleId = $routeParams.id;
  var url = '/getArticles?_id=' + articleId;
  $scope.article = {};
  $scope.articles = [];
  $scope.status = {
    response: false,
    err: false
  };

  function init() {
    if (articleId !== '0') {
      getArticle();
    } else {
      fillFilds();
    }
  }

  function fillFilds() {
    $scope.article.content = "<article class='box post'>" +
      "<h2 align='center' style='color: #ee9a2f'> TITULO DEL BLOG AQUI</h2>" +
      "<p align='justify'>Parrafo 1 aquí</p>" +
      "<a href='' class='image featured'><img src='images/imagesBlog4/1.jpg' alt=''></a>" +
      "<br>" +
      "<p align='justify'>Parrafo 2 aquí</p>" +
      "<a href='' class='image featured'><img src='images/imagesBlog4/2.gif' alt=''></a>" +
      "<br>" +
      "</article>";

    var content = "<section style='text-align: center;'>" +
      "<h2 class='orange'> TITULO DEL BLOG AQUÍ</h2>" +
      "<br><img class='imgBlogs' src='images/imagesBlog4/0.jpg'>" +
      "<p align='justify'>Texto del abstract aquí</p>" +
      "</section>";

    var text = "TITULO DEL BLOG \n" +
      "Texto del abstract aquí nada con HTML";

    $scope.article.shortView = {
      content: content,
      text: text
    };

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
      });
  }

  function getArticles() {
    var allArticles = '/getArticles?categorie=blog&live=true';
    if ($scope.article.relations) {
      allArticles += '&relations=' + $scope.article.relations;
    }


    $http.get(allArticles)
      .then(function(result) {
          if (result.data.status) {
            $scope.articles = cleanArticles(result.data.articles);
          }
        },
        function(err) {
          console.log(err)
        })
  }

  function cleanArticles(articles) {
    var showArticles = []
    for (var i = 0; i < articles.length; i++) {
      if (articles[i]._id !== articleId) {
        showArticles.push(articles[i]);
      }
    }

    return showArticles;
  }

  init();

  $scope.saveArticle = function() {
    if (articleId === '0') {
      createArticle();
    } else {
      updateArticle();
    }
  };

  function validFields() {
    var article = $scope.article;
    var name = article.name;
    var bost = article.bost;
    var content = article.content;
    var shortContent;
    var shortTitle;

    if (article.shortView) {
      shortTitle = article.shortView.title;
      shortContent = article.shortView.content;
    } else {
      return false;
    }

    if (!name || name === '') {
      return false;
    } else if (!bost || bost === '') {
      return false;
    } else if (!content || content === '') {
      return false;
    } else if (!shortTitle || shortTitle === '') {
      return false;
    } else if (!shortContent || shortContent === '') {
      return false;
    } else {
      return true;
    }

  }

  function createArticle() {
    if (validFields()) {
      var url = '/createArticle';
      var article = $scope.article;
      article.categorie = 'blog';

      $http.post(url, article)
        .then(function(result) {
          if (result.data.status) {
            var msg = 'Blog creado correctamente!';
            success(result.data.article, msg);
          } else {
            error();
          }
        }, function(error) {
          error(error);
        });
    } else {
      swal(
        'Opss!',
        'Debes llenar todos los campos',
        'error'
      );
    }
  }

  function updateArticle() {
    var url = '/updateArticle';
    var article = $scope.article;

    $http.put(url, article)
      .then(function(result) {
        if (result.data.status) {
          var msg = 'Blog actualizado correctamente!';
          success(result.data.article, msg);
        } else {
          error();
        }
      }, function(error) {
        error(error);
      });
  }

  function success(article, msg) {
    $scope.article = article;
    swal(
      'Bien!',
      msg,
      'success'
    ).then(function() {
      window.location.href = '/administrator#/blogs';
    })
  }

  function error(error) {
    swal(
      'Opss!',
      'Paso algo malo con nuestro servidor :( intenta de nuevo',
      'error'
    );
  }



});
