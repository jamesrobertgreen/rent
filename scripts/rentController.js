app.controller('rentController', ['$scope', '$filter', function ($scope, $filter) {
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
            $scope.pricePerMonth = Math.round($scope.pricePerMonth * 100) /100;
        }
        else {
            $scope.pricePerWeek = (($scope.pricePerMonth * 12) / 52);
            $scope.pricePerWeek = Math.round($scope.pricePerWeek * 100) /100;
        }
};
}]);