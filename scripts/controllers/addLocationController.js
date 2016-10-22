app.controller('addLocationController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.addLocation = function (name, address, latitude, longitude) {
        var newLocation = {
            "name": name
            , "address": address
            , "latitude": latitude
            , "longitude": longitude
        };
        $rootScope.locations = $scope.locations.concat(newLocation);
        $rootScope.updateLocations();
        window.alert("Added!");
    };
    $scope.removeLocation = function ($index) {
        $rootScope.locations.splice($index, 1);
        $rootScope.updateLocations();
    };
}]);