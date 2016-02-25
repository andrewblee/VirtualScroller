module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        greeting: string;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes, ctlr, transclude) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            greeting: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            VirtualScroller.prototype.link = (scope: IVirtualScrollerScope, element: JQuery, attributes, ctlr, transclude) => {
                scope.greeting = 'hi from directive';

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