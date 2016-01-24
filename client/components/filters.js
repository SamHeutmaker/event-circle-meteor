angular.module('EventCircle')
  .filter('searchFor', function() {
<<<<<<< HEAD
    return function(events, filterParams, filterFunction) {
    	
    	return (function(){

    		var currentEvents = events;

    		for(var index = 0; index < filterFunction.length; index++) {

    			currentEvents = filterFunction[index].fn(currentEvents, filterFunction[index].query);
    		}

    		return currentEvents;

    	})();
=======
    return function(events, filterParameter, filterFunction) {
    	return filterFunction(events, filterParameter);
>>>>>>> 1ce3685ef067a53619a14ee967d0bb49a2e1e45d
    }
  });