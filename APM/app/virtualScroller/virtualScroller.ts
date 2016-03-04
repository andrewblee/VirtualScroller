module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        greeting: string;
        arr: Array<number>;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes, ctlr, transclude) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            greeting: '=',
            arr: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            VirtualScroller.prototype.link = (scope: IVirtualScrollerScope, element: JQuery, attributes, ctlr, transclude) => {
                scope.greeting = 'hi from directive';
                scope.arr = [1, 2, 3];

                console.log('hello');
                transclude(scope, function (clone, scope) {
                    element.append(clone);
                });
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