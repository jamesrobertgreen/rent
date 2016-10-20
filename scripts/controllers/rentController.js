app.controller('rentController', ['$scope', '$rootScope', function ($scope,$rootScope, $filter) {
    $rootScope.activeMenu = 'my-properties';
    $scope.init = function () {
        var tmpPlaces = localStorage.getItem("places");
        if (tmpPlaces === '' || tmpPlaces === undefined || tmpPlaces === null) {
            $rootScope.places = [];
        }
        else {
            $rootScope.places = JSON.parse(tmpPlaces);
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



}]);