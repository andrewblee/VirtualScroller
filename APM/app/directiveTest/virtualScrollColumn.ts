module app {
    'use strict';
    export interface IStandard {
        id: number,
        name: string
    }

    export interface IDictionary<T> {
        [key: string]: T;
    }

    export interface IVirtualScrollColumnScope extends ng.IScope {
        data: IDictionary<any>;
        style: {};
        cellHeight: number;
    }

    class VirtualScrollColumn {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            cellHeight: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                validateScope();

                let keys = Object.keys($scope.data);

                let CELL_BUFFER_COUNT = 3;
                let SCROLL_RESOLUTION_MILLISECONDS = 80;
                let $headerCol = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                setCanvasHeight();
                populateStandardCol();

                (<any>element.find('.virtual-scroll-col')).scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
                    populateStandardCol();
                });

                function populateStandardCol() {
                    var scrollAmount = $('.virtual-scroll-col').scrollTop();
                    var firstCell = Math.floor(scrollAmount / $scope.cellHeight);
                    var headerColHeight = $('.virtual-scroll-col').height();
                    var numCellsShowing = Math.round(headerColHeight / $scope.cellHeight);
                    var numCellsShowingPlusBuffer = numCellsShowing + CELL_BUFFER_COUNT;
                    populateStandardData(keys, firstCell, Math.min(firstCell + numCellsShowingPlusBuffer + 1, keys.length), $scope.data);
                }

                function populateStandardData(keys, first, last, data) {
                    var i, length, html = '';

                    for (i = first; i < last; i++) {
                        html += '<div class="virtual-scroll-col-box" style="top:' + i * $scope.cellHeight + 'px">' + data[keys[i]].name + '</div>';
                    }

                    $canvas.html(html);

                    for (i = first - 1; i >= Math.max(first - CELL_BUFFER_COUNT, 0); i--) {
                        $canvas.prepend('<div class="virtual-scroll-col-box" style="top:' + i * $scope.cellHeight + 'px">' + $scope.data[keys[i]].name + '</div>');
                    }
                }

                function validateScope() {
                    if (!$scope.data) {
                        throw new Error('data must be defined');
                    }

                    if ($scope.cellHeight === undefined || $scope.cellHeight <= 0) {
                        throw new Error('cellHeight is invalid.');
                    }
                }

                /**
                 * Set the overall canvas height.  Dependent on data length and cell height.
                 */
                function setCanvasHeight() {
                    if (keys.length) {
                        $scope.style = {
                            'height': keys.length * $scope.cellHeight + 'px'
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