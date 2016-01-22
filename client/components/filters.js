angular.module('EventCircle')
  .filter('searchFor', function() {
    return function(events, filterParameter, filterFunction) {
    	return filterFunction(events, filterParameter);
    }
  });