module app {
    class VirtualScrollerCtrl {
        static $inject = ['$scope'];
        constructor(private $scope: IVirtualScrollerScope) {
            $scope.person = {
                name: 'John Doe',
                profession: 'Fake name'
            };

            $scope.header = 'Person';
        }
    }
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
}