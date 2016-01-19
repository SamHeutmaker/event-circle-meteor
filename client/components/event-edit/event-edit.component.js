angular.module('EventCircle')
  .directive('eventEdit', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/components/event-edit/event-edit.html',
      controllerAs: 'eventEdit',
      controller: function($scope, $reactive, $timeout, $state) {
        
        // Attach $scope to $reactive
        $reactive(this).attach($scope);

      }
    }
  });