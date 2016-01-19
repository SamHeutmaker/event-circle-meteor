  angular.module('EventCircle').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('events', {
        url: '/events',
        template: '<event-list></event-list>'
      })
      .state('eventPost', {
        url: '/post',
        template: '<event-post></event-post>',
        resolve: {
          currentUser: ($q) => {
            if(Meteor.userId() == null) {
              return $q.reject();
            }
          }
        }
      })
      .state('eventDetails', {
        url: '/events/:eventId',
        template: '<event-details></event-details>',
        resolve: {
          currentUser: ($q) => {
            if(Meteor.userId() == null) {
              return $q.reject();
            }
          }
        }
      })
      .state('eventEdit', {
        url: '/events/:eventId/edit',
        template: '<event-edit></event-edit>',
        resolve: {
          currentUser: ($q) => {
            if(Meteor.userId() == null) {
              return $q.reject();
            }
          }
        }
      });

    $urlRouterProvider.otherwise("/");
  })

  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      if(error === 'AUTH_REQUIRED') {
        $state.go('/events');
      }
    });
  });