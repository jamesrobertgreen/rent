app.controller('rentController', ['$scope', '$rootScope','$location', function ($scope, $rootScope, $location) {
    $scope.init = function () {
        var tmpPlaces = localStorage.getItem("places");
        if (tmpPlaces === '' || tmpPlaces === undefined || tmpPlaces === null || tmpPlaces === '[]') {
            $rootScope.places = [];
            $rootScope.activeMenu = 'add-property';
            $location.path('/add-property');
        }
        else {
            $rootScope.places = JSON.parse(tmpPlaces);
            $rootScope.activeMenu = 'my-properties';
            $location.path('/');
        }
        var tmpLocations = localStorage.getItem("locations");
        if (tmpLocations === '' || tmpLocations === undefined || tmpLocations === null) {
            $rootScope.locations = [];
        }
        else {
            $rootScope.locations = JSON.parse(tmpLocations);
        }
    };
    $rootScope.clearAll = function () {
        $rootScope.places = [];
        $rootScope.locations = [];
        $rootScope.updatePlaces();
        $rootScope.updateLocations();
    };
    $rootScope.updatePlaces = function () {
        localStorage.setItem("places", JSON.stringify($rootScope.places));
    };
    $rootScope.updateLocations = function () {
        localStorage.setItem("locations", JSON.stringify($rootScope.locations));
    };
    $scope.removePlace = function ($index) {
        $rootScope.places.splice($index, 1);
        $rootScope.updatePlaces();
    };
}]);