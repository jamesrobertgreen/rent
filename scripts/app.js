var app = angular.module('rent', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/show-properties.html'
        , controller: 'rentController'
    }).when('/add-location', {
        templateUrl: 'partials/add-location.html'
        , controller: 'addLocationController'
    }).when('/add-property', {
        templateUrl: 'partials/add-property.html'
        , controller: 'addPropertyController'
    }).otherwise({
        redirectTo: '/'
    });
});