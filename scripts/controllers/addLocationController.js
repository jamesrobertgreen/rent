app.controller('addLocationController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.addLocation = function (name, description, latitude, longitude) {
        var newLocation = {
            "name": name
            , "description": description
            , "latitude": ""
            , "longitude": ""
        };
        $rootScope.locations = $scope.locations.concat(newLocation);
        $rootScope.updateLocations();
    };
    $scope.removeLocation = function ($index) {
        $rootScope.locations.splice($index, 1);
        $rootScope.updateLocations();
    };
}]);