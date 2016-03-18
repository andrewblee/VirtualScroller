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
            $scope.virtualData = [];
            $scope.arr = [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },
                {
                    id: 7
                },
                {
                    id: 8
                },
                {
                    id: 9
                },
                {
                    id: 10
                },
                {
                    id: 11
                },
                {
                    id: 12
                },
                {
                    id: 13
                },
                {
                    id: 14
                },
                {
                    id: 15
                },
                {
                    id: 16
                },
            ];
        }
        VirtualScrollerCtrl.$inject = ['$scope'];
        return VirtualScrollerCtrl;
    })();
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollerCtrl.js.map