var records = [];
var activeRecord = 0;

var app = angular.module("browseDBApp", []);
app.controller("browseDBCtrl", function($scope, $http) {
    $scope.obj = [];

    $scope.getRecord = function() {
        $http({
            method: "get",
            url: "http://localhost:5000/get-record",
        }).then(function(response) {
            if(response.data.msg === "Success!") {
                records = response.data.restData;
                $scope.obj = records[activeRecord];
                $scope.showHide();
            } else {
                console.log(response);
            }
        }, function(response) {
            console.log(response);
        });
    }

    $scope.changeDirection = function(direction) {
        activeRecord += direction;
        $scope.obj = records[activeRecord];
        $scope.showHide();
    }

    $scope.showHide = function() {
        $scope.hidePrev = (activeRecord === 0) ? true : false;
        $scope.hideNext = (activeRecord === records.length - 1) ? true : false;
    }

    $scope.getRecord();
});
