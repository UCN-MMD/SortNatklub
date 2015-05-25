angular.module("umbraco").controller("SortPackEditor", function ($scope, dialogService) {
    if ($scope.model.value && $scope.model.value.length > 0) {
        $scope.items = $scope.model.value;
    } else {
        $scope.items = [];
    }

    $scope.model.value = $scope.items;

    $scope.addItem = function () {
        dialogService.contentPicker({ callback: function (node) { $scope.items.push({ node: {id:node.id, name: node.name}, amount: 1 }); } });
    };

    $scope.removeItem = function (item) {
        $scope.items.splice(item);
    };
    
});