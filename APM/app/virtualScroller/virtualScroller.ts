module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        greeting: string;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            greeting: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            VirtualScroller.prototype.link = (scope: IVirtualScrollerScope, element: JQuery, attributes) => {
                //scope.greeting = 'hi from directive';
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