angular.module('EventCircle')
  .directive('eventPost', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/components/event-post/event-post.html',
      controllerAs: 'eventPost',
      controller: function($scope, $reactive) {

        $reactive(this).attach($scope);

        this.newEvent = {};

        this.newOne = () => {
          this.newEvent.owner = Meteor.user()._id;
          this.newEvent.createdAt = new Date();
          Events.insert(this.newEvent);
          this.newEvent = {};
        };

      }
    }
  });