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
                delayInMilliseconds: '=',
                orderedDataIds: '=',
                top: '=',
                bottom: '=',
                left: '=',
                colWidth: '='
            };
            this.restrict = 'E';
            VirtualScrollColumn.prototype.link = function (scope, element, attributes) {
                setDefaultValues();
                validateScope();
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
                };
                var $column = element.find('.virtual-scroll-col');
                var $canvas = element.find('.canvas');
                setCanvasHeight();
                populateData();
                $column.scrolled(scope.delayInMilliSeconds, function () {
                    populateData();
                });
                function populateData() {
                    var firstVisible = Math.floor($column.scrollTop() / scope.cellHeight);
                    var visibleColHeight = $column.height();
                    var visibleCellCount = Math.round(visibleColHeight / scope.cellHeight) + 1;
                    var lastVisible = firstVisible + visibleCellCount;
                    populateVisibleData(firstVisible, lastVisible);
                }
                /**
                 * Function populates canvas with data.
                 * @param firstVisible Index of the first visible cell.
                 * @param lastVisible Index of the last visible cell.
                 */
                function populateVisibleData(firstVisible, lastVisible) {
                    var i, length, html = '';
                    // Add buffer to last visible cell as long as it doesn't exceed data length.
                    for (i = firstVisible; i < Math.min(lastVisible + scope.buffer, scope.orderedDataIds.length); i++) {
                        html += '<div class="cell" style="top:' + i * scope.cellHeight + 'px">' + scope.data[scope.orderedDataIds[i]].name + '</div>';
                    }
                    $canvas.html(html);
                    // Need to prepend these after the visible cells have been added to the DOM otherwise the buffer cells will be showing.
                    // Also add cells one by one above the visible cells so that the closest cells will be visible first when the user scrolls upward.
                    for (i = firstVisible - 1; i >= Math.max(firstVisible - scope.buffer, 0); i--) {
                        $canvas.prepend('<div class="cell" style="top:' + i * scope.cellHeight + 'px">' + scope.data[scope.orderedDataIds[i]].name + '</div>');
                    }
                }
                function setDefaultValues() {
                    var DEFAULT_BUFFER = 3;
                    var DEFAULT_DELAY_IN_MILLISECONDS = 80;
                    var DEFAULT_BOT = 0;
                    var DEFAULT_LEFT = 0;
                    scope.buffer = scope.buffer || DEFAULT_BUFFER;
                    scope.delayInMilliSeconds = scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                    scope.bottom = scope.bottom || DEFAULT_BOT;
                    scope.left = scope.left || DEFAULT_LEFT;
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
                    if (scope.colWidth === undefined || scope.colWidth <= 0) {
                        throw new Error('cellWidth is invalid.');
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