module app {
    class VirtualScrollerCtrl {
        test: number;

        static $inject = ['$scope'];
        constructor(private $scope: IVirtualScrollerScope) {
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
    }
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
}