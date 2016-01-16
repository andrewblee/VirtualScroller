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
        cellHeight: number;
        buffer: number;
        delayInMilliSeconds: number;
    }

    class VirtualScrollColumn {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            cellHeight: '=',
            buffer: '=',
            delayInMilliseconds: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                let DEFAULT_BUFFER = 3;
                let DEFAULT_DELAY_IN_MILLISECONDS = 80;

                $scope.buffer = $scope.buffer || DEFAULT_BUFFER;
                $scope.delayInMilliSeconds = $scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;

                validateScope();

                let keys = Object.keys($scope.data);
                let $headerCol = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                setCanvasHeight($canvas, keys.length, $scope.cellHeight);
                populateStandardCol();

                (<any>element.find('.virtual-scroll-col')).scrolled($scope.delayInMilliSeconds, function () {
                    populateStandardCol();
                });

                function populateStandardCol() {
                    var scrollAmount = $headerCol.scrollTop();
                    var firstCell = Math.floor(scrollAmount / $scope.cellHeight);
                    var headerColHeight = $headerCol.height();
                    var numCellsShowing = Math.round(headerColHeight / $scope.cellHeight);
                    var numCellsShowingPlusBuffer = numCellsShowing + $scope.buffer;
                    var lastVisible = Math.min(firstCell + numCellsShowingPlusBuffer + 1, keys.length);
                    populateData($scope.data, keys, firstCell, lastVisible, $scope.cellHeight, $scope.buffer);
                }

                function populateData(data: IDictionary<any>, keys: string[], firstVisible: number, lastVisible: number, cellHeight: number, buffer: number) {
                    let i, length, html = '';

                    for (i = firstVisible; i < lastVisible; i++) {
                        html += '<div class="virtual-scroll-col-box" style="top:' + i * cellHeight + 'px">' + data[keys[i]].name + '</div>';
                    }

                    $canvas.html(html);

                    // Need to prepend these after the visible cells have been added to the DOM otherwise the buffer cells will be showing.
                    // Also add cells one by one above the visible cells so that the closest cells will be visible first when the user scrolls upward.
                    for (i = firstVisible - 1; i >= Math.max(firstVisible - buffer, 0); i--) {
                        $canvas.prepend('<div class="virtual-scroll-col-box" style="top:' + i * cellHeight + 'px">' + data[keys[i]].name + '</div>');
                    }
                }

                function validateScope() {
                    if (!$scope.data) {
                        throw new Error('data must be defined');
                    }

                    if ($scope.cellHeight === undefined || $scope.cellHeight <= 0) {
                        throw new Error('cellHeight is invalid.');
                    }

                    if ($scope.buffer === undefined || $scope.buffer <= 0) {
                        throw new Error('cellBuffer is invalid.');
                    }

                    if ($scope.delayInMilliSeconds === undefined || $scope.delayInMilliSeconds <= 0) {
                        throw new Error('delayInMilliSeconds is invalid.');
                    }
                }

                /**
                 * Set the overall canvas height.
                 * @param canvas JQuery reference to the canvas.
                 * @param dataLength Total number of data elements.
                 * @param cellHeight Height in pixels of a single column cell.
                 */
                function setCanvasHeight(canvas: JQuery, dataLength: number, cellHeight: number) {
                    canvas.height(dataLength * cellHeight);
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