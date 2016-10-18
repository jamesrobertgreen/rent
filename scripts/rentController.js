app.controller('rentController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.loisLatitude = 37.7716948;
    $scope.loisLongitude = -122.4405735;
    $scope.myLatitude = 51.52152280000001;
    $scope.myLongitude = -0.1420892;
    
    $scope.init = function () {
        var tmpPlaces = localStorage.getItem("places");
        if (tmpPlaces === '' || tmpPlaces === undefined || tmpPlaces === null) {
            $scope.places = [];
        }
        else {
            $scope.places = JSON.parse(tmpPlaces);
        }
    };
    var updateStorage = function () {
        localStorage.setItem("places", JSON.stringify($scope.places));
    };
    $scope.addPlace = function (link, location, pricePerWeek, pricePerMonth, notes) {
        var newPlace = {
            "link": link
            , "location": location
            , "pricePerWeek": pricePerWeek
            , "pricePerMonth": pricePerMonth
            , "notes": notes
        };
        $(function () {
            function calculateDistance(origin, destination) {
                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix({
                    origins: [origin]
                    , destinations: [destination]
                    , travelMode: google.maps.TravelMode.DRIVING
                    , unitSystem: google.maps.UnitSystem.IMPERIAL
                    , avoidHighways: false
                    , avoidTolls: false
                }, callback);
            }

            function callback(response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    $('#result').html(err);
                }
                else {
                    var origin = response.originAddresses[0];
                    var destination = response.destinationAddresses[0];
                    if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                        $('#result').html("Better get on a plane. There are no roads between " + origin + " and " + destination);
                    }
                    else {
                        var distance = response.rows[0].elements[0].distance;
                        var distance_value = distance.value;
                        var distance_text = distance.text;
                        var miles = distance_text.substring(0, distance_text.length - 3);
                        $('#result').html("It is " + miles + " miles from " + origin + " to " + destination);
                    }
                }
            }
            $('#distance_form').submit(function (e) {
                event.preventDefault();
                var origin = $('#origin').val();
                var destination = $('#destination').val();
                var distance_text = calculateDistance(origin, destination);
            });
        });
        $scope.places = $scope.places.concat(newPlace);
        updateStorage();
    };
    $scope.remove = function ($index) {
        $scope.places.splice($index, 1);
        updateStorage();
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