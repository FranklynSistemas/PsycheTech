var app = angular.module('PsycheTech', ['ngRoute', 'ui.router', 'ncy-angular-breadcrumb'])

app.config(function ($routeProvider, $stateProvider, $locationProvider) {
  
  var home = {
    url: '/',
    name: 'home',
    templateUrl: 'templates/home.html',
    ncyBreadcrumb: {
      label: 'Home page'
    }
  }

  var blogs = {
    url: '/blog',
    name: 'blogs',
    templateUrl: 'templates/blog.html',
    controller: 'blogCtrl',
    ncyBreadcrumb: {
      label: 'Blogs'
    }
  }

  var blog = {
    url: '/blogs/{name}',
    name: 'blog',
    templateUrl: 'templates/blogs.html',
    controller: 'blogsCtrl',
    ncyBreadcrumb: {
      label: 'Blog'
    }
  }

  var servicios = {
    url: '/servicios/{serviceName}',
    name: 'servicios',
    templateUrl: 'templates/services.html',
    controller: 'servicesCtrl',
    ncyBreadcrumb: {
      label: 'Servicios'
    }
  }

  var sobreNosotros = {
    url: '/sobre-nosotros',
    name: 'sobreNosotros',
    templateUrl: 'templates/aboutus.html',
    controller: 'aboutCtrl',
    ncyBreadcrumb: {
      label: 'Sobre Nosotros'
    }
  }


  $stateProvider.state(home);
  $stateProvider.state(blogs);
  $stateProvider.state(blog);
  $stateProvider.state(servicios);
  $stateProvider.state(sobreNosotros);

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })

})

app.controller('startCtrl', function ($scope, $rootScope, $location, $http) {
  var $window = $(window)

  $scope.baseText = 'Aquí podrás encontrar novedades y grandes curiosidades sobre ' +
    'psicología y tecnología, encuentra todo lo que no sabías y lo que te estás perdiendo.'

  $rootScope.baseUrl = 'https://psychetech.co/'

  $scope.$on('$viewContentLoaded', function () {
    var location = $location.path().split('/')
    if (location.length < 3) {
      $('#share').jsSocials('option', 'text', $scope.baseText)
      $('#share').jsSocials('option', 'url', $rootScope.baseUrl + $location.path())
      $('#share').jsSocials('refresh')
    }
  })

  window.fbAsyncInit = function () {
    FB.init({
      appId: '293935774467795',
      cookie: true,
      xfbml: true,
      version: 'v2.12'
    })

    FB.AppEvents.logPageView()
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/es_LA/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))

  $window.on('load', function () {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response)
    })

    function statusChangeCallback (response) {
      if (response.status === 'connected') {
        getUserInfo()
      }

      /*
        {
          status: 'connected',
          authResponse: {
              accessToken: '...',
              expiresIn:'...',
              signedRequest:'...',
              userID:'...'
          }
      }
      */
    }

    function getUserInfo () {
      FB.api('/me?fields=id,name,picture,email', function (response) {
        $rootScope.$apply(function () {
          $rootScope.isAuth = true
          $rootScope.user = response
        })
      })
    }

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction()
    }

    function scrollFunction () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('myBtn').style.display = 'block'
      } else {
        document.getElementById('myBtn').style.display = 'none'
      }
    }

    $('#share').jsSocials({
      shares: ['email', 'twitter', {
        share: 'facebook',
        label: 'Share'
      }, 'linkedin', 'whatsapp'],
      url: $rootScope.baseUrl + $location.path(),
      showCount: true,
      shareIn: 'popup',
      on: {
        click: function (e) {
          createLog({
            eventName: 'Social Share',
            log: this.share + ' share ' + this.url
          })
        }
      }
    })
  })

  function createLog (data) {
    var url = '/createLog'

    $http.post(url, data)
      .then(function (result) {
        console.log(result)
      })
  }

  $scope.getUp = function () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  $scope.openForm = () => {
    swal({
      title: 'Recibe a tu correo la mejor información sobre psicología y tecnología',
      input: 'email',
      showCancelButton: true,
      confirmButtonColor: '#ffb150',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          resolve();
        })
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        createSubcriber(result.value)
      }
    })
  }

  function createSubcriber(email){
    const url = '/createSubscriber'
    $http.post(url, {email: email})
      .then(function (result) {
        if(result.data.status) {
          showAlert({
            type: 'success',
            title: '! Bien ¡',
            msg: 'Ahora podrás saber cuando subimos nuestros nuevos blogs y muchas cosas màs  :D'
          })
        } else {
          showAlert({
            type: 'error',
            title: '! Ups ¡',
            msg: 'Ocurrio algo mientras enviando tu correo :( prueba de nuevo'
          })
        }
        
      })
  }

  function showAlert(data) {
    swal({
          type: data.type,
          title: data.title,
          html: data.msg
        })
  }
})
