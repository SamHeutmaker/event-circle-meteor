angular.module('EventCircle')
  .directive('eventDetails', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/components/event-details/event-details.html',
      controllerAs: 'eventDetails',
      controller: function($scope, $stateParams, $reactive, $timeout, $state) {

        // Attach $scope to $reactive
        $reactive(this).attach($scope);

        // Get one event based on Id
        this.helpers({
          event: () => {
            return Events.findOne({
              _id: $stateParams.eventId
            });
          }
        });
        // Save changes to event
        this.update = () => {
          Events.update({
            _id: $stateParams.eventId
          }, {
            $set: {
              name: this.event.name,
              description: this.event.description
            }
          });
        };
        // Check owner of current event
        this.isUser = (event) =>{
          return (event.owner === Meteor.userId()) ? true : false;
        }
        // Remove event based on Id
        this.removeEvent = (event) => {
          Events.remove({
            _id: event._id
          });
        };
        // For animation on every page load
        this.show = false;
        this.changeShow = () => {
          this.show = !this.show;
        };
        $timeout(() => {
          this.changeShow();
        }, 100);

      }
    }
  });