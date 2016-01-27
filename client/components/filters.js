angular.module('EventCircle')
  .filter('searchFor', function() {
    return function(events, filterFunction) {
      return (function() {
        var currentEvents = events;
        for (var index = 0; index < filterFunction.length; index++) {
          currentEvents = filterFunction[index].fn(currentEvents,
            filterFunction[index].query);
        }
        return currentEvents;
      })();
    };
  })
