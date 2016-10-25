app.controller('rentController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    $scope.init = function () {
        var tmpProperties = localStorage.getItem("properties");
        if (tmpProperties === '' || tmpProperties === undefined || tmpProperties === null || tmpProperties === '[]') {
            $rootScope.properties = [];
            $rootScope.activeMenu = 'add-property';
            $location.path('/add-property');
        }
        else {
            $rootScope.properties = JSON.parse(tmpProperties);
            $rootScope.activeMenu = 'my-properties';
            $location.path('/');
        }
        var tmpLocations = localStorage.getItem("locations");
        if (tmpLocations === '' || tmpLocations === undefined || tmpLocations === null || tmpLocations === '[]') {
            $rootScope.locations = [];
        }
        else {
            $rootScope.locations = JSON.parse(tmpLocations);
        }
    };
    $rootScope.clearAll = function () {
        $rootScope.properties = [];
        $rootScope.locations = [];
        $scope.locations = [];
        $rootScope.updateProperties();
        $rootScope.updateLocations();
    };
    $rootScope.updateProperties = function () {
        localStorage.setItem("properties", JSON.stringify($rootScope.properties));
    };
    $rootScope.updateLocations = function () {
        localStorage.setItem("locations", JSON.stringify($rootScope.locations));
    };
    $scope.removeProperty = function ($index) {
        $rootScope.properties.splice($index, 1);
        $rootScope.updateProperties();
    };

}]);