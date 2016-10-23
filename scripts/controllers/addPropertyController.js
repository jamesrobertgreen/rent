app.controller('addPropertyController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.addProperty = function (link, location, longitude, latitude, pricePerWeek, pricePerMonth, notes) {
        var newProperty = {
            "id": $rootScope.properties.length
            , "link": link
            , "location": location
            , "longitude": longitude
            , "latitude": latitude
            , "pricePerWeek": pricePerWeek
            , "pricePerMonth": pricePerMonth
            , "notes": notes
            , "locations": []
        };
        $rootScope.properties = $scope.properties.concat(newProperty);
        $rootScope.updateProperties();
        window.alert("Added!");
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