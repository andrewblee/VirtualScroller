var app;
(function (app) {
    var VirtualScrollerCtrl = (function () {
        function VirtualScrollerCtrl($scope) {
            this.$scope = $scope;
            $scope.person = {
                name: 'John Doe',
                profession: 'Fake name'
            };
            $scope.header = 'Person';
        }
        VirtualScrollerCtrl.$inject = ['$scope'];
        return VirtualScrollerCtrl;
    })();
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollerCtrl.js.map