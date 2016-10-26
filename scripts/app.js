var app = angular.module('rent', ['ngRoute', 'ngMap', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/show-properties.html'
        , controller: 'rentController'
    }).when('/add-location', {
        templateUrl: 'partials/add-location.html'
        , controller: 'locationController'
    }).when('/add-property', {
        templateUrl: 'partials/add-property.html'
        , controller: 'propertyController'
    }).otherwise({
        redirectTo: '/'
    });
});