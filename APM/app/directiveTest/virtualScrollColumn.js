var app;
(function (app) {
    'use strict';
    var VirtualScrollColumn = (function () {
        function VirtualScrollColumn() {
            this.templateUrl = 'app/directiveTest/virtual-scroll-column.html';
            this.scope = {
                data: '=',
                cellHeight: '=',
                buffer: '=',
                delayInMilliseconds: '='
            };
            this.restrict = 'E';
            VirtualScrollColumn.prototype.link = function (scope, element, attributes) {
                var DEFAULT_BUFFER = 3;
                var DEFAULT_DELAY_IN_MILLISECONDS = 80;
                scope.buffer = scope.buffer || DEFAULT_BUFFER;
                scope.delayInMilliSeconds = scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                validateScope();
                var keys = Object.keys(scope.data);
                var column = element.find('.virtual-scroll-col');
                var canvas = element.find('.canvas');
                setCanvasHeight(canvas, keys.length, scope.cellHeight);
                populateStandardCol(column.scrollTop(), scope.cellHeight);
                column.scrolled(scope.delayInMilliSeconds, function () {
                    populateStandardCol(column.scrollTop(), scope.cellHeight);
                });
                function populateStandardCol(scrollAmount, cellHeight) {
                    var firstVisible = Math.floor(scrollAmount / cellHeight);
                    var headerColHeight = column.height();
                    var numCellsShowing = Math.round(headerColHeight / cellHeight);
                    var numCellsShowingPlusBuffer = numCellsShowing + scope.buffer;
                    var lastVisible = Math.min(firstVisible + numCellsShowingPlusBuffer + 1, keys.length);
                    populateData(canvas, scope.data, keys, firstVisible, lastVisible, cellHeight, scope.buffer);
                }
                /**
                 * Function populates the data into the DOM.
                 * @param canvas JQuery reference to the canvas.
                 * @param data Dictionary containing data.
                 * @param keys Dictionary keys.
                 * @param firstVisible Index of the first visible cell.
                 * @param lastVisible Index of the last visible cell.
                 * @param cellHeight Height in pixels of a single column cell.
                 * @param buffer Number of cells to insert above and below the visible cells to improve user scrolling experience.
                 */
                function populateData(canvas, data, keys, firstVisible, lastVisible, cellHeight, buffer) {
                    var i, length, html = '';
                    for (i = firstVisible; i < lastVisible; i++) {
                        html += '<div class="virtual-scroll-col-box" style="top:' + i * cellHeight + 'px">' + data[keys[i]].name + '</div>';
                    }
                    canvas.html(html);
                    // Need to prepend these after the visible cells have been added to the DOM otherwise the buffer cells will be showing.
                    // Also add cells one by one above the visible cells so that the closest cells will be visible first when the user scrolls upward.
                    for (i = firstVisible - 1; i >= Math.max(firstVisible - buffer, 0); i--) {
                        canvas.prepend('<div class="virtual-scroll-col-box" style="top:' + i * cellHeight + 'px">' + data[keys[i]].name + '</div>');
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
                 * @param canvas JQuery reference to the canvas.
                 * @param dataLength Total number of data elements.
                 * @param cellHeight Height in pixels of a single column cell.
                 */
                function setCanvasHeight(canvas, dataLength, cellHeight) {
                    canvas.height(dataLength * cellHeight);
                }
            };
        }
        VirtualScrollColumn.Factory = function () {
            var directive = function () {
                return new VirtualScrollColumn();
            };
            directive['$inject'] = [];
            return directive;
        };
        return VirtualScrollColumn;
    })();
    angular
        .module("productManagement")
        .directive("virtualScrollColumn", VirtualScrollColumn.Factory());
})(app || (app = {}));
//# sourceMappingURL=virtualScrollColumn.js.map