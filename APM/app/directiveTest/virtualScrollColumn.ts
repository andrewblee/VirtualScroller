module app {
    'use strict';
    export interface IStandard {
        id: number,
        name: string
    }

    export interface IStandardsById {
        [id: number] : IStandard
    }

    export interface IVirtualScrollColumnScope extends ng.IScope {
        appendString: string;
        greeting: string;
        standardsById: IStandardsById;
        standardIds: number[];
        style: {};
        cellHeight: number;
    }

    class VirtualScrollColumn {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            appendString: '=',
            standardsById: '=',
            standardIds: '=',
            cellHeight: '='
        };
        public restrict = 'AE';

        constructor() {
            VirtualScrollColumn.prototype.link = ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                setCanvasHeight();

                element.on('click', function () {
                    var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                    changeName(name);
                    $scope.$apply();
                });

                function setCanvasHeight() {
                    if ($scope.standardIds) {
                        $scope.style = {
                            'height': $scope.standardIds.length * $scope.cellHeight + 'px'
                        }
                    }
                }

                function changeName(name) {
                    $scope.greeting = 'Hello ' + name + ' ! ' + $scope.appendString;
                }
            };
        }

        public static Factory() {
            var directive = () => {
                return new VirtualScrollColumn();
            };

            directive['$inject'] = [];

            return directive;
        }
    }

    angular
        .module("productManagement")
        .directive("virtualScrollColumn", VirtualScrollColumn.Factory());
}