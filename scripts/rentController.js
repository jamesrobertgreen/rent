app.controller('rentController', ['$scope', function ($scope) {
    $scope.places = [];
    $scope.addPlace = function (link, location, pricePerWeek, pricePerMonth, notes) {
        var newPlace = {
            "link": link
            , "location": location
            , "pricePerWeek": pricePerWeek
            , "pricePerMonth": pricePerMonth
            , "notes": notes
        };
        $scope.places = $scope.places.concat(newPlace);
    };
    $scope.remove = function ($index) {
        $scope.places.splice($index, 1);
    };
    $scope.change = function (whichField) {
        if (whichField === 'perweek') {
            $scope.pricePerMonth = (($scope.pricePerWeek * 52) / 12);
        }
        else {
            $scope.pricePerWeek = (($scope.pricePerMonth * 12) / 52);
        }
    };
}]);