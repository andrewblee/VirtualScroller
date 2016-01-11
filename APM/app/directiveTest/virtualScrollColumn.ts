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
        standardsById: IStandardsById;
        standardIds: number[];
        style: {};
        cellHeight: number;
        standards: IStandard[];
    }

    class VirtualScrollColumn {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            standardsById: '=',
            standardIds: '=',
            cellHeight: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                setCanvasHeight();

                (<any>element.find('.header-col')).scrolled(80, function () {
                    console.log('hello from scrolled');
                });

                let html = '';
                for (let i = 0, length = $scope.standardIds.length; i < length; i++) {
                    html += '<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + $scope.standardsById[$scope.standardIds[i]].name + '</div>';
                }

                element.find('.header-col').html(html);

                element.on('click', function () {
                    $scope.$apply();
                });

                function setCanvasHeight() {
                    if ($scope.standardIds) {
                        $scope.style = {
                            'height': $scope.standardIds.length * $scope.cellHeight + 'px'
                        }
                    }
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