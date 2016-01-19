angular.module('EventCircle')
  .filter('searchFor', function() {
    return function(events, filterParameter, filterFunction) {
    	console.log(filterFunction);
    	return filterFunction(events, filterParameter);
    }
  });