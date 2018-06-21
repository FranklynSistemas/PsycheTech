app.controller('servicesCtrl', function($scope, $http, $routeParams) {
  $scope.serviceName = $routeParams.serviceName
  $scope.formService = {}
  var url = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/getServices?live=true&type=' + $scope.serviceName
  $scope.services = []

  function getServices() {
    $http.get(url)
    .then(function(result) {
      if (result.data.status) {
        $scope.services = result.data.services
      }
    }, function(err) {

    })
  }

  $scope.getService =  function (serviceId) {
    $('#btnTakeService').button('loading')
    $http.get(url + '&_id=' + serviceId)
    .then(function(result) {
      if (result.data.status) {
        $scope.service = result.data.services[0]
        $('#modalService').modal('show')
        $('#btnTakeService').button('reset')
      }
    }, function(err) {

    })
  }


  function init() {
    $scope.form = {
      typeVideoCall: '0',
      availability: '0'
    }
    $scope.formService = {}
    getServices()
  }

  init()

  $scope.sendFrom = function(form, isSpecific) {
    const url = 'http://ec2-18-206-244-124.compute-1.amazonaws.com/createContact'
    var finalForm

    if (!isSpecific) {
      finalForm = JSON.parse(JSON.stringify(form))
      delete form.typeVideoCall
      delete form.availability
    }

    if (!angular.equals(form, {})) {
      form.type = $scope.serviceName 
      if(isSpecific) {
        form.topic = $scope.service.title
      } else {
        form = finalForm 
      }
      $http.post(url, form)
        .then(function(result) {
          swal(
            'Bien!',
            'Nos pondremos en contácto contigo lo más rapído posible!',
            'success'
          )
          $('#modalService').modal('hide')
          init()
        }, function(err) {
          swal(
            'Opss!',
            'Paso algo malo con nuestro servidor :( intenta de nuevo o escribenos un correo',
            'error'
          )
        })
    } else {
      if (!isSpecific) {
        $scope.form = finalForm
      }
      swal(
        'Opss!',
        'Debes llenar todos los campos ;) ',
        'error'
      )
    }
  }

  $scope.closeModal = function() {
   $('#modalService').modal('hide')
  }
})
