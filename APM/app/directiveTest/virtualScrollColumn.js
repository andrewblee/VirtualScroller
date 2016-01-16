var app;
(function (app) {
    'use strict';
    var VirtualScrollColumn = (function () {
        function VirtualScrollColumn() {
            this.templateUrl = 'app/directiveTest/virtual-scroll-column.html';
            this.scope = {
                data: '=',
                cellHeight: '='
            };
            this.restrict = 'E';
            VirtualScrollColumn.prototype.link = function ($scope, element, attributes) {
                validateScope();
                var keys = Object.keys($scope.data);
                var CELL_BUFFER_COUNT = 3;
                var SCROLL_RESOLUTION_MILLISECONDS = 80;
                var $headerCol = element.find('.virtual-scroll-col');
                var $canvas = element.find('.canvas');
                setCanvasHeight();
                populateStandardCol();
                element.find('.virtual-scroll-col').scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
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
                        };
                    }
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