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

        this.keyPressed = (e) => {
          this.filterBoxControls.showFilterControls();
        };

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

          // Check if Event has text anywhere in any property
          textSearch: (events, filterParameter) => {
            return (events, filterParameter) => {
              var toReturn = _.filter(events, function(event) {
                var concatenated = _.reduce(event, function(x, y) {
                  if (!(event._id === y || event.createdAt === y || event.owner === y || __proto__ === y)) {
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
          hasOwner: (event, filterParameter) => {
            return (events, filterParameter) => {
              var toReturn = _.filter(events, function(event) {
                return (event.owner === Meteor.userId() ? true : false);
              });
              return toReturn;
            };
          }
        };

        // Update filter function when searchFilters change
        $scope.$watch( () => {
            return this.eventControls.searchFilters.hasText;
          }, () => {
          this.filterFunction = ((events, filterParameter) => {
            console.log('changed');
            // Returns a list of events that contain
            if (this.eventControls.searchFilters.hasText) {
              return this.searchFunctions.textSearch(events, filterParameter);
            } else if (this.eventControls.searchFilters.hasOwner) {
              return this.searchFunctions.hasOwner(events, filterParameter);
            }
          })();
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
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});