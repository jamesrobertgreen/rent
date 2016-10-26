app.controller('locationModalController', function ($scope, $modal, $log) {
    $scope.geopos = {
        lat: 51.523164
        , lng: -0.15687704
        , address: ""
    };
    $scope.selected = {
        lat: 0
        , lng: 0
        , address: ""
    };
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'modal-template.html'
            , controller: 'ModalInstanceCtrl'
            , size: size
            , scope: $scope
            , resolve: {
                lat: function () {
                    return $scope.geopos.lat;
                }
                , lng: function () {
                    return $scope.geopos.lng;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {}, function () {});
    };
});
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, lat, lng) {
    $scope.geopos.lat = lat;
    $scope.geopos.lng = lng;
    $scope.render = true;
    $scope.validation_text = "";
    $scope.$on('mapInitialized', function (evt, evtMap) {
        $scope.map = evtMap;
        $scope.marker = new google.maps.Marker({
            position: evt.latLng
            , map: $scope.map
        });
        google.maps.event.trigger($scope.map, 'resize');
        $scope.click = function (evt) {
            var latitude = evt.latLng.lat().toPrecision(8);
            var longitude = evt.latLng.lng().toPrecision(8);
            $scope.validation_text = "";
            $scope.marker.setPosition(evt.latLng);
            $scope.map.panTo(evt.latLng);
            $scope.map.setZoom(10);
            $scope.geopos.lat = latitude;
            $scope.geopos.lng = longitude;
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
            geocoder.geocode({
                'latLng': latlng
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $scope.geopos.address = results[1].formatted_address;
                    }
                    else {
                        console.log('Location not found');
                    }
                }
                else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        }
    });
    $scope.ok = function () {
        $scope.selected.lat = $scope.geopos.lat;
        $scope.selected.lng = $scope.geopos.lng;
        $scope.selected.address = $scope.geopos.address;
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.close();
    };
});