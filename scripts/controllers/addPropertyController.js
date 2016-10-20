app.controller('addPropertyController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.addPlace = function (link, location, longitude,latitude,pricePerWeek, pricePerMonth, notes) {
        var newPlace = {
            "link": link
            , "location": "location"
            , "longitude": "longitude"
            , "latitude": "latitude"
            , "pricePerWeek": pricePerWeek
            , "pricePerMonth": pricePerMonth
            , "notes": notes
        };
        $rootScope.places = $scope.places.concat(newPlace);
        $scope.updatePlaces();
    };
    $scope.removePlace = function ($index) {
        $rootScope.places.splice($index, 1);
        $scope.updatePlaces();
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