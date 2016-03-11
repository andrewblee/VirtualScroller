module app {
    class VirtualScrollerCtrl {
        test: number;

        static $inject = ['$scope'];
        constructor(private $scope: IVirtualScrollerScope) {
            this.test = 5;

            $scope.person = {
                name: 'John Doe',
                profession: 'Fake name'
            };

            $scope.header = 'Person';
            //$scope.arr = [1,2,3];
        }
    }
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
}