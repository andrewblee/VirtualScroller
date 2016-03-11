var app;
(function (app) {
    var VirtualScrollerCtrl = (function () {
        function VirtualScrollerCtrl($scope) {
            this.$scope = $scope;
            this.test = 5;
            $scope.person = {
                name: 'John Doe',
                profession: 'Fake name'
            };
            $scope.header = 'Person';
            //$scope.arr = [1,2,3];
        }
        VirtualScrollerCtrl.$inject = ['$scope'];
        return VirtualScrollerCtrl;
    })();
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollerCtrl.js.map