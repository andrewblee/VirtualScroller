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
        orderedDataIds: number[];
        cellHeight: number;
        buffer: number;
        delayInMilliSeconds: number;
    }

    class VirtualScrollColumn {
        public link: (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            cellHeight: '=',
            buffer: '=',
            delayInMilliseconds: '=',
            orderedDataIds: '='
        };
        public restrict = 'E';

        constructor() {
            VirtualScrollColumn.prototype.link = (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                let DEFAULT_BUFFER = 3;
                let DEFAULT_DELAY_IN_MILLISECONDS = 80;

                scope.buffer = scope.buffer || DEFAULT_BUFFER;
                scope.delayInMilliSeconds = scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;

                validateScope();

                let $column = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                setCanvasHeight();
                populateStandardCol($column.scrollTop(), scope.cellHeight);

                (<any>$column).scrolled(scope.delayInMilliSeconds, function () {
                    populateStandardCol($column.scrollTop(), scope.cellHeight);
                });

                function populateStandardCol(scrollAmount: number, cellHeight: number) {
                    let firstVisible = Math.floor(scrollAmount / cellHeight);
                    let headerColHeight = $column.height();
                    let numCellsShowing = Math.round(headerColHeight / cellHeight);
                    //let numCellsShowingPlusBuffer = numCellsShowing + scope.buffer;
                    let lastVisible = firstVisible + numCellsShowing + 1;
                    //let lastVisible = Math.min(firstVisible + numCellsShowingPlusBuffer + 1, keys.length);
                    populateData(firstVisible, lastVisible);
                }

                /**
                 * Function populates canvas with data.
                 * @param firstVisible Index of the first visible cell.
                 * @param lastVisible Index of the last visible cell.
                 */
                function populateData(firstVisible: number, lastVisible: number) {
                    let i, length, html = '';

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
                        throw new Error('data must be defined');
                    }

                    if (scope.cellHeight === undefined || scope.cellHeight <= 0) {
                        throw new Error('cellHeight is invalid.');
                    }

                    if (scope.buffer === undefined || scope.buffer <= 0) {
                        throw new Error('cellBuffer is invalid.');
                    }

                    if (scope.delayInMilliSeconds === undefined || scope.delayInMilliSeconds <= 0) {
                        throw new Error('delayInMilliSeconds is invalid.');
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