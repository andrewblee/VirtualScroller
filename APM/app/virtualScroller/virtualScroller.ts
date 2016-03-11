module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        person: any;
        header: string;
        arr: Array<number>;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            header: '=',
            arr: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            VirtualScroller.prototype.link = ($scope: IVirtualScrollerScope, element: JQuery, attributes) => {
                $scope.header = 'hi from directive';
                $scope.arr = [1, 2, 3, 4];
            };
        }

        public static Factory() {
            var directive = () => {
                return new VirtualScroller();
            };

            directive['$inject'] = [];

            return directive;
        }
    }


    angular
        .module("productManagement")
        .directive("virtualScroller", VirtualScroller.Factory());
}