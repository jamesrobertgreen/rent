app.controller('addLocationController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var self = this;
    var currentProperty;
    $scope.addLocation = function (name, address, latitude, longitude) {
        $scope.locationName = name;
        var newLocation = {
            "id": $rootScope.locations.length
            , "name": name
            , "address": address
            , "latitude": latitude
            , "longitude": longitude
        };
        $rootScope.locations = $scope.locations.concat(newLocation);
        $rootScope.updateLocations();
        calcDistanceBetweenProperties(latitude, longitude);
        window.alert("Added!");
    };
    $scope.removeLocation = function ($index) {
        $rootScope.locations.splice($index, 1);
        $rootScope.updateLocations();
    };
    var calcDistanceBetweenProperties = function (lat, long) {
        angular.forEach($rootScope.properties, function (property) {
            calcDistance(property, property.latitude, property.longitude, lat, long);
        });
    };
    var calcDistance = function (currentProperty, propertyLat, propertyLng, locationLat, locationLng) {
        var origin = new google.maps.LatLng(propertyLat, propertyLng);
        var destination = new google.maps.LatLng(locationLat, locationLng);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin]
            , destinations: [destination]
            , travelMode: google.maps.TravelMode.WALKING
            , unitSystem: google.maps.UnitSystem.IMPERIAL
            , avoidHighways: false
            , avoidTolls: false
        }, callback(currentProperty));
    }
    var callback = function (currentProperty) {
        return function (response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                $scope.distanceText = err;
            }
            else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    //$scope.distanceText = "There are no roads between " + origin + " and " + destination;
                }
                else {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    //$scope.distanceText = "It is " + miles + " miles from " + origin + " to " + destination;
                    var newDistance = {
                        "name": $scope.locationName
                        , "distance": miles
                    };
                    currentProperty.locations.push(newDistance);
                    $rootScope.updateProperties();
                }
                //console.log($scope.distanceText);
            }
        };
    }
}]);