app.controller('rentController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.init = function () {
        var tmpPlaces = localStorage.getItem("places");
        if (tmpPlaces === '' || tmpPlaces === undefined || tmpPlaces === null) {
            $scope.places = [];
        }
        else {
            $scope.places = JSON.parse(tmpPlaces);
        }
        var tmpLocations = localStorage.getItem("locations");
        if (tmpLocations === '' || tmpLocations === undefined || tmpLocations === null) {
            $scope.locations = [];
        }
        else {
            $scope.locations = JSON.parse(tmpLocations);
        }
    };
    $scope.updateStorage = function () {
        localStorage.setItem("places", JSON.stringify($scope.places));
    };
    var updateLocations = function () {
        localStorage.setItem("locations", JSON.stringify($scope.locations));
    };
    $scope.addPlace = function (link, location, pricePerWeek, pricePerMonth, notes) {
        var newPlace = {
            "link": link
            , "location": location
            , "pricePerWeek": pricePerWeek
            , "pricePerMonth": pricePerMonth
            , "distanceToLocationOne": ""
            , "distanceToLocationTwo": ""
            , "notes": notes
        };
        $scope.places = $scope.places.concat(newPlace);
        $scope.updateStorage();
    };
    $scope.removePlace = function ($index) {
        $scope.places.splice($index, 1);
        $scope.updateStorage();
    };
    $scope.addLocation = function (name, description, latitude, longitude) {
        var newLocation = {
            "name": name
            , "description": description
            , "latitude": ""
            , "longitude": ""
        };
        $scope.locations = $scope.locations.concat(newLocation);
        updateLocations();
    };
    $scope.removeLocation = function ($index) {
        $scope.locations.splice($index, 1);
        updateLocations();
    };
    $scope.change = function (whichField) {
        if (whichField === 'perweek') {
            $scope.pricePerMonth = (($scope.pricePerWeek * 52) / 12);
            $scope.pricePerMonth = Math.round($scope.pricePerMonth * 100) / 100;
        }
        else {
            $scope.pricePerWeek = (($scope.pricePerMonth * 12) / 52);
            $scope.pricePerWeek = Math.round($scope.pricePerWeek * 100) / 100;
        }
    };
}]);