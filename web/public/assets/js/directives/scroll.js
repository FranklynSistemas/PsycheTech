app.directive('scrollDirective', ['$window', '$rootScope', scrollDirective])
  
  function scrollDirective($window, $rootScope) {
    return {
      link: function (scope, element, attrs) {
        var handler;
        $rootScope.valueProgessVar = 0;
        $window = angular.element($window);

        handler = function(some, someOne) {
          let height = $("#contentArticle").height();
          let scrollY = window.scrollY;
          let position = Math.round((scrollY / height) * 100);
          if (position <= 100) {
            $rootScope.valueProgessVar = Math.round((scrollY / height) * 100);
            $rootScope.$apply();
          }
        };
        $window.on('scroll', handler);
      }
    };

  };