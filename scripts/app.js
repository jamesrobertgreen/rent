var app = angular.module('rent', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/show-properties.html'
    }).when('/add-location', {
        templateUrl: 'partials/add-location.html'
    }).when('/add-property', {
        templateUrl: 'partials/add-property.html'
    }).otherwise({
        redirectTo: '/'
    });
});
