var app = angular.module("restTableApp", []);
app.controller("restTableCtrl", function($scope, $http) {
    $scope.restaurants = [];
    $scope.types = [];

    $scope.getRecords = function() {
        $http({ 
            method: "get",
            url: "http://localhost:5000/get-record"
        }).then(function(response) {
            if(response.data.msg === "Success!") {
                $scope.restaurants = response.data.restData;
                $scope.types = getTypes(response.data.restData);
                $scope.selectedType = $scope.types[0];
            }
        }, function(response) {
            console.log(response);
        });
    }

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;

            $http({ 
                method: "get",
                url: "http://localhost:5000/get-recordByType",
                params: {restFoodType: type}
            }).then(function(response) {
                if(response.data.msg === "Success!") {
                    $scope.restaurants = response.data.restData;
                }
            }, function(response) {
                console.log(response);
            });
    }

    $scope.deleteRecord = function(restID) {
        $http({ 
            method: "delete",
            url: "http://localhost:5000/delete-record",
            params: {id: restID}
        }).then(function(response) {
            if(response.data.msg === "Success!") {
                $scope.redrawTable();
            }
        }, function(response) {
            console.log(response);
        });
    }

    $scope.editRecord = function(restNumber) {
        $scope.restName = $scope.restaurants[restNumber].restName;
        $scope.restAddress = $scope.restaurants[restNumber].restAddress;
        $scope.restCity = $scope.restaurants[restNumber].restCity;
        $scope.restZip = $scope.restaurants[restNumber].restZip;
        $scope.restPhone = $scope.restaurants[restNumber].restPhone;
        $scope.restFoodType = $scope.restaurants[restNumber].restFoodType;
        $scope.restAvgCustRating = parseFloat($scope.restaurants[restNumber].restAvgCustRating);
        $scope.restID = $scope.restaurants[restNumber].id;

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.cancelUpdate = function() {
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    $scope.updateRecord = function() {
        if($scope.restName === "" || $scope.restFoodType === "") {
            return;
        }
        console.log("Restaurant ID check: " + $scope.restID);

        $http({
            method: "put",
            url: "http://localhost:5000/update-record",
            data: {
                "id": $scope.restID,
                "restName": $scope.restName,
                "restAddress": $scope.restAddress,
                "restCity": $scope.restCity,
                "restZip": $scope.restZip,
                "restPhone": $scope.restPhone,
                "restFoodType": $scope.restFoodType,
                "restAvgCustRating": $scope.restAvgCustRating
            }
        }).then(function(response) {
            if(response.data.msg === "Success!") {
                $scope.hideTable = false;
                $scope.hideForm = true;
                $scope.redrawTable();

                $scope.restName = "";
                $scope.restAddress = "";
                $scope.restCity = "";
                $scope.restZip = "";
                $scope.restPhone = "";
                $scope.restFoodType = "";
                $scope.restAvgCustRating = "";
            } else {
                console.log(response);
            }
        }, function(response) {
            console.log(response);
        });
    }

    $scope.getRecords();
});

function getTypes(restTableData) {
    var typeExists;
    var typesArray = [{value: "", display: "ALL"}];

    for (var i = 0; i < restTableData.length; i++) {
        typeExists = typesArray.find(function(element) {
            return element.value === restTableData[i].restFoodType;
        });

        if(typeExists) {
            continue;
        } else {
            typesArray.push({value: restTableData[i].restFoodType, display: restTableData[i].restFoodType});
        }
    }
    return typesArray;
}