﻿module app {
    'use strict';

    export interface IVirtualScrollColumnScope extends ng.IScope {
        data: Array<any>;
        cellHeight: number;
        buffer: number;
        delayInMilliSeconds: number;
        colStyle: {};
        canvasStyle: {};
        top: number;
        bottom: number;
        left: number;
        colWidth: number;
    }

    class VirtualScrollColumn {
        public link: (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/directiveTest/virtual-scroll-column.html';
        public scope = {
            data: '=',
            cellHeight: '=',
            buffer: '=',
            delayInMilliseconds: '=',
            top: '=',
            bottom: '=',
            left: '=',
            colWidth: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            VirtualScrollColumn.prototype.link = (scope: IVirtualScrollColumnScope, element: JQuery, attributes) => {
                let $column = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                setDefaultValues();
                validateScope();
                configureStyle();

                /**
                 * Update height and virtual scroll data only when controller changes data IDs.
                 */
                scope.$watchCollection('data', (newCollection, oldCollection, scope) => {
                    setCanvasHeight();
                    populateData();
                });

                (<any>$column).scrolled(scope.delayInMilliSeconds, function () {
                    populateData();
                });

                function configureStyle() : void {
                    scope.colStyle = {
                        'position': 'absolute',
                        'top': scope.top,
                        'bottom': scope.bottom,
                        'left': scope.left,
                        'width': scope.colWidth,
                        'overflow-x': 'hidden',
                        'overflow-y': 'auto'
                    };

                    scope.canvasStyle = {
                        'position': 'relative'
                    }
                }

                function populateData() : void {
                    let firstVisible = Math.floor($column.scrollTop() / scope.cellHeight);
                    let visibleColHeight = $column.height();
                    let visibleCellCount = Math.round(visibleColHeight / scope.cellHeight) + 1;
                    let lastVisible = firstVisible + visibleCellCount;
                    populateDataPlusBuffer(firstVisible, lastVisible);
                }

                /**
                 * Function populates canvas with visible data plus buffer cells for smooth scrolling.
                 * @param firstVisible Index of the first visible cell.
                 * @param lastVisible Index of the last visible cell.
                 */
                function populateDataPlusBuffer(firstVisible: number, lastVisible: number) : void {
                    let i, length, html = '';

                    // Add buffer to last visible cell as long as it doesn't exceed data length.
                    for (i = firstVisible; i < Math.min(lastVisible + scope.buffer, scope.data.length); i++) {
                        html += '<div class="cell" style="top:' + i * scope.cellHeight + 'px">' + scope.data[i].name + '</div>';
                    }

                    $canvas.html(html);

                    // Need to prepend these after the visible cells have been added to the DOM otherwise the buffer cells will be showing.
                    // Also add cells one by one above the visible cells so that the closest cells will be visible first when the user scrolls upward.
                    for (i = firstVisible - 1; i >= Math.max(firstVisible - scope.buffer, 0); i--) {
                        $canvas.prepend('<div class="cell" style="top:' + i * scope.cellHeight + 'px">' + scope.data[i].name + '</div>');
                    }
                }

                function setDefaultValues() : void {
                    let DEFAULT_BUFFER = 3;
                    let DEFAULT_DELAY_IN_MILLISECONDS = 80;
                    let DEFAULT_BOT = 0;
                    let DEFAULT_LEFT = 0;
                    let DEFAULT_TOP = 0;

                    scope.buffer = scope.buffer || DEFAULT_BUFFER;
                    scope.delayInMilliSeconds = scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                    scope.bottom = scope.bottom || DEFAULT_BOT;
                    scope.left = scope.left || DEFAULT_LEFT;
                    scope.top = scope.top || DEFAULT_TOP;
                }

                function validateScope() : void {
                    if (!scope.data) {
                        throw new Error('data must be defined.');
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

                    if (scope.colWidth === undefined || scope.colWidth <= 0) {
                        throw new Error('cellWidth is invalid.');
                    }
                }

                /**
                 * Set the overall canvas height.
                 */
                function setCanvasHeight() : void {
                    $canvas.height(scope.data.length * scope.cellHeight);
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