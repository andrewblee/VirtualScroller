module app {
    'use strict';


    export interface IDictionary<T> {
        [key: string]: T;
    }

    export interface IVirtualScrollColumnScope extends ng.IScope {
        data: IDictionary<any>;
        orderedDataIds: number[];
        cellHeight: number;
        buffer: number;
        delayInMilliSeconds: number;
        columnStyle: {};
        top: number;
        bottom: number;
        left: number;
    }

    class VirtualScrollColumn {
        public link: (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            cellHeight: '=',
            buffer: '=',
            delayInMilliseconds: '=',
            orderedDataIds: '=',
            top: '=',
            bottom: '=',
            left: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                let DEFAULT_BUFFER = 3;
                let DEFAULT_DELAY_IN_MILLISECONDS = 80;
                let DEFAULT_BOT = 0;
                let DEFAULT_LEFT = 0;

                scope.buffer = scope.buffer || DEFAULT_BUFFER;
                scope.delayInMilliSeconds = scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                scope.bottom = scope.bottom || DEFAULT_BOT;
                scope.left = scope.left || DEFAULT_LEFT;

                validateScope();

                scope.columnStyle = {
                    'position': 'absolute',
                    'top': scope.top,
                    'bottom': scope.bottom,
                    'left': scope.left,
                    'width': '200px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                    'background': 'red'
                };

                let $column = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                setCanvasHeight();
                populateData();

                (<any>$column).scrolled(scope.delayInMilliSeconds, function () {
                    populateData();
                });

                function populateData() {
                    let firstVisible = Math.floor($column.scrollTop() / scope.cellHeight);
                    let visibleColHeight = $column.height();
                    let visibleCellCount = Math.round(visibleColHeight / scope.cellHeight) + 1;
                    let lastVisible = firstVisible + visibleCellCount;
                    populateVisibleData(firstVisible, lastVisible);
                }

                /**
                 * Function populates canvas with data.
                 * @param firstVisible Index of the first visible cell.
                 * @param lastVisible Index of the last visible cell.
                 */
                function populateVisibleData(firstVisible: number, lastVisible: number) {
                    let i, length, html = '';

                    // Add buffer to last visible cell as long as it doesn't exceed data length.
                    for (i = firstVisible; i < Math.min(lastVisible + scope.buffer, scope.orderedDataIds.length); i++) {
                        html += '<div class="virtual-scroll-col-box" style="top:' + i * scope.cellHeight + 'px">' + scope.data[scope.orderedDataIds[i]].name + '</div>';
                    }

                    $canvas.html(html);

                    // Need to prepend these after the visible cells have been added to the DOM otherwise the buffer cells will be showing.
                    // Also add cells one by one above the visible cells so that the closest cells will be visible first when the user scrolls upward.
                    for (i = firstVisible - 1; i >= Math.max(firstVisible - scope.buffer, 0); i--) {
                        $canvas.prepend('<div class="virtual-scroll-col-box" style="top:' + i * scope.cellHeight + 'px">' + scope.data[scope.orderedDataIds[i]].name + '</div>');
                    }
                }

                function validateScope() {
                    if (!scope.data) {
                        throw new Error('data must be defined.');
                    }

                    if (!scope.orderedDataIds) {
                        throw new Error('orderedDataIds must be defined.');
                    }

                    if (scope.orderedDataIds.length !== Object.keys(scope.data).length) {
                        throw new Error('data and orderedDataIds must have the same length.');
                    }

                    if (scope.cellHeight === undefined || scope.cellHeight <= 0) {
                        throw new Error('cellHeight is invalid.');
                    }

                    if (scope.buffer === undefined || scope.buffer < 0) {
                        throw new Error('cellBuffer is invalid.');
                    }

                    if (scope.delayInMilliSeconds === undefined || scope.delayInMilliSeconds <= 0) {
                        throw new Error('delayInMilliSeconds is invalid.');
                    }

                    if (scope.top === undefined || scope.top < 0) {
                        throw new Error('top is invalid.');
                    }

                    if (scope.left === undefined || scope.left < 0) {
                        throw new Error('left is invalid.');
                    }

                    if (scope.bottom === undefined || scope.bottom < 0) {
                        throw new Error('bottom is invalid.');
                    }
                }

                /**
                 * Set the overall canvas height.
                 */
                function setCanvasHeight() {
                    $canvas.height(scope.orderedDataIds.length * scope.cellHeight);
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