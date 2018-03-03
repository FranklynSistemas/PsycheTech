app.controller('serviceCtrl', function ($scope, $routeParams, $location, $http) {
  var serviceId = $routeParams.id
  var url = '/getServices?_id=' + serviceId
  $scope.service = {}
  $scope.services = []
  $scope.status = {
    response: false,
    err: false
  }

  function init () {
    if (serviceId !== '0') {
      getService()
    } else {
      fillFilds()
    }
  }

  function fillFilds () {
    $scope.service.content = 'Aqui el texto del servicio o caracteristicas'
  }

  function getService () {
    $http.get(url)
      .then(function (result) {
        if (result.data.status) {
          $scope.service = result.data.services[0]
          $scope.status.response = true
        }
      }, function (err) {
        $scope.status.response = true
        $scope.status.err = true
      })
  }

  init()

  $scope.saveService = function () {
    if (serviceId === '0') {
      createService()
    } else {
      updateService()
    }
  }

  function validFields () {
    var service = $scope.service
    var title = service.title
    var bost = service.bost
    var content = service.content

    if (!title || title === '') {
      return false
    } else if (!bost || bost === '') {
      return false
    } else if (!content || content === '') {
      return false
    } else {
      return true
    }
  }

  function createService () {
    if (validFields()) {
      var url = '/createService'
      var service = $scope.service

      $http.post(url, service)
        .then(function (result) {
          if (result.data.status) {
            var msg = 'Servicio creado correctamente!'
            success(result.data.service, msg)
          } else {
            error()
          }
        }, function (error) {
          error(error)
        })
    } else {
      swal(
        'Opss!',
        'Debes llenar todos los campos',
        'error'
      )
    }
  }

  function updateService () {
    var url = '/updateService'
    var service = $scope.service

    $http.put(url, service)
      .then(function (result) {
        if (result.data.status) {
          var msg = 'Servicio actualizado correctamente!'
          success(result.data.service, msg)
        } else {
          error()
        }
      }, function (error) {
        error(error)
      })
  }

  function success (service, msg) {
    $scope.service = service
    swal(
      'Bien!',
      msg,
      'success'
    ).then(function () {
      window.location.href = '/administrator#/services'
    })
  }

  function error (error) {
    swal(
      'Opss!',
      'Paso algo malo con nuestro servidor :( intenta de nuevo',
      'error'
    )
  }
})
