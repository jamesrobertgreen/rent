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
        calcDistanceBetweenProperties(location, latitude, longitude);
        window.alert("Added!");
    };
    $scope.removeLocation = function ($index) {
        $rootScope.locations.splice($index, 1);
        $rootScope.updateLocations();
    };
    var calcDistanceBetweenProperties = function (location, lat, long) {
        angular.forEach($rootScope.properties, function (property) {
            console.log("Property - " + property.link);
            $scope.calcDistance(location, property, property.latitude, property.longitude, lat, long);
        });
    };
    $scope.calcDistance = function (locationName, property, propertyLat, propertyLng, locationLat, locationLng) {
        var origin = new google.maps.LatLng( propertyLat,propertyLng);
        var destination = new google.maps.LatLng(locationLat, locationLng);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin]
            , destinations: [destination]
            , travelMode: google.maps.TravelMode.WALKING
            , unitSystem: google.maps.UnitSystem.IMPERIAL
            , avoidHighways: false
            , avoidTolls: false
        }, callback);
    }
    var callback = function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $scope.distanceText = err;
        }
        else {
            var origin = response.originAddresses[0];
            var destination = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $scope.distanceText = "There are no roads between " + origin + " and " + destination;
            }
            else {
                var distance = response.rows[0].elements[0].distance;
                var distance_value = distance.value;
                var distance_text = distance.text;
                var miles = distance_text.substring(0, distance_text.length - 3);
                $scope.distanceText = "It is " + miles + " miles from " + origin + " to " + destination;
            }
            console.log($scope.distanceText);
        }
    }
}]);