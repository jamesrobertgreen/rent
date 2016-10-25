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
        // add to the list of properties to local storage and then update the distances.
        // This is incase we don't have internet etc. We can recalc if needed later.
        var propertyAdded = $rootScope.properties[$rootScope.properties.length - 1];
        // get the property we just added
        // added a new property add the distance between this and all current locations
        if (propertyAdded) {
            calcDistanceBetweenLocations(propertyAdded,latitude, longitude);
        }
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
    var calcDistanceBetweenLocations = function (propertyAdded,lat, long) {
        angular.forEach($rootScope.locations, function (loc) {
            console.log("loc id " + loc.id + "name = " + loc.name);
            calcDistance(propertyAdded,loc, loc.latitude, loc.longitude, lat, long);
        });
    };
    var calcDistance = function (propertyAdded,currentLoc, locLat, locLng, propertyLat, propertyLng) {
        var origin = new google.maps.LatLng(locLat, locLng);
        var destination = new google.maps.LatLng(propertyLat, propertyLng);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin]
            , destinations: [destination]
            , travelMode: google.maps.TravelMode.WALKING
            , unitSystem: google.maps.UnitSystem.IMPERIAL
            , avoidHighways: false
            , avoidTolls: false
        }, callback(propertyAdded,currentLoc));
    }
    var callback = function (propertyAdded,currentLoc) {
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
                        "name": currentLoc.name
                        , "distance": miles
                    };
                    propertyAdded.locations.splice(currentLoc.id,0,newDistance);
                    $rootScope.updateProperties();
                }
                //console.log($scope.distanceText);
            }
        };
    }
}]);