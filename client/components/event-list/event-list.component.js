angular.module('EventCircle')
  .directive('eventList', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/components/event-list/event-list.html',
      controllerAs: 'eventList',
      controller: function($scope, $reactive, $timeout) {

        // Attach $scope to $reactive
        $reactive(this).attach($scope);

        // Returns all events
        this.helpers({
          events: () => {
            return Events.find({}, {
              sort: {
                createdAt: -1
              }
            });
          }
        });

        // Filter Control Interface
        this.filterBoxControls = {
          show: false,
          showFilterControls: () => {
            this.eventControls.filterParameter = "";
            this.filterBoxControls.show = (this.filterBoxControls.show) ? false : true;
          }
        };

        // Event Filtering Controls
        this.eventControls = {
          allEvents: () => {
            this.eventControls.searchFilters.searchFiltershasOwner = false;
            this.eventControls.searchFilters.hasText = true;
            this.eventControls.filterParameter = '';
          },
          myEvents: () => {
            this.eventControls.searchFilters.hasText = false;
            this.eventControls.searchFilters.hasOwner = true;
            this.eventControls.filterParameter = Meteor.userId();
          },
          searchFilters: {
            hasOwner: false,
            hasText: true,
          },
          filterParameter: ""
        };

        // Functions for filter events. Used as filters.
        this.searchFunctions = {
          // Filter property by text
          textSearch: () => {
            return (events, filterParameter) => {
              if (typeof events === 'function') {
                events = events();
              }
              var toReturn = _.filter(events, function(event) {
                var concatenated = _.reduce(event, function(x, y) {
                  if (event.name === y || event.allContent === y || event.description === y) {
                    var newString = y.replace(/\s/g, "");
                    newString = y.toLowerCase();
                    return x + newString.toString();

                  } else {
                    return x;
                  }

                }, "");
                return (concatenated.indexOf(filterParameter) > -1 ? true : false);
              });
              return toReturn;
            }
          },
          // Filter events by owner id
          hasOwner: () => {
            return (events, filterParameter) => {
              var toReturn = _.filter(events, function(event) {
                return (event.owner === Meteor.userId() ? true : false);
              });
              return toReturn;
            };
          }
        };

        this.buildFilter = {
          filters: [{
            fn: this.searchFunctions.textSearch(),
            query: 'natalie'
          }, {
            fn: this.searchFunctions.textSearch(),
            query: 'sam'
          }, {
            fn: this.searchFunctions.hasOwner(),
            query: 'XpWXZRNRPsy7D9xSH'
          }],
          addFilter: (query, type) => {

          }
        }

        // Update filter function when searchFilters change
        $scope.$watch(() => {
          return this.eventControls.searchFilters.hasText;
        }, () => {
          this.filterFunction = this.buildFilter.filters;
        });

        // For Animation on each page load
        this.showEvents = false;
        this.changeShowEvents = () => {
          this.showEvents = !this.showEvents
        };
        $timeout(() => {
          this.changeShowEvents();
        }, 200);
      }
    }
  })

.directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element, args) {

      $timeout(function() {
        _element[0].focus();
      }, 0);


    }
  };
});