module app {
    'use strict';
    export interface IStandard {
        id: number,
        name: string
    }

    export interface IStandardsById {
        [id: number] : IStandard
    }

    export interface IDictionary<T> {
        [key: string]: T;
    }

    export interface IVirtualScrollColumnScope extends ng.IScope {
        data: IDictionary<any>;
        standardIds: number[];
        style: {};
        cellHeight: number;
        standards: IStandard[];
    }

    class VirtualScrollColumn {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            standardIds: '=',
            cellHeight: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                let CELL_BUFFER_COUNT = 3;
                let SCROLL_RESOLUTION_MILLISECONDS = 80;
                let $headerCol = element.find('.header-col');
                let $canvas = element.find('.canvas');

                setCanvasHeight();
                populateStandardCol();

                (<any>element.find('.header-col')).scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
                    populateStandardCol();
                });

                function populateStandardCol() {
                    var scrollAmount = $('.header-col').scrollTop();
                    var firstCell = Math.floor(scrollAmount / $scope.cellHeight);
                    var headerColHeight = $('.header-col').height();
                    var numCellsShowing = Math.round(headerColHeight / $scope.cellHeight);
                    var numCellsShowingPlusBuffer = numCellsShowing + CELL_BUFFER_COUNT;
                    populateStandardData($scope.standardIds, firstCell, Math.min(firstCell + numCellsShowingPlusBuffer + 1, $scope.standardIds.length), $scope.data);
                }

                function populateStandardData(standardIds, first, last, data) {
                    var i, length, html = '';

                    for (i = first; i < last; i++) {
                        html += '<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + data[standardIds[i]].name + '</div>';
                    }

                    $canvas.html(html);

                    for (i = first - 1; i >= Math.max(first - CELL_BUFFER_COUNT, 0); i--) {
                        $canvas.prepend('<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + $scope.data[standardIds[i]].name + '</div>');
                    }
                }

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