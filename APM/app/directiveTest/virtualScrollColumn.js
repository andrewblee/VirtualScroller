var app;
(function (app) {
    'use strict';
    var VirtualScrollColumn = (function () {
        function VirtualScrollColumn() {
            this.templateUrl = 'app/directiveTest/virtual-scroll-column.html';
            this.scope = {
                standardsById: '=',
                standardIds: '=',
                cellHeight: '='
            };
            this.restrict = 'E';
            VirtualScrollColumn.prototype.link = function ($scope, element, attributes) {
                var CELL_BUFFER_COUNT = 3;
                var SCROLL_RESOLUTION_MILLISECONDS = 80;
                var $headerCol = element.find('.header-col');
                var $canvas = element.find('.canvas');
                setCanvasHeight();
                populateStandardCol();
                element.find('.header-col').scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
                    populateStandardCol();
                });
                function populateStandardCol() {
                    var scrollAmount = $('.header-col').scrollTop();
                    var firstCell = Math.floor(scrollAmount / $scope.cellHeight);
                    var headerColHeight = $('.header-col').height();
                    var numCellsShowing = Math.round(headerColHeight / $scope.cellHeight);
                    var numCellsShowingPlusBuffer = numCellsShowing + CELL_BUFFER_COUNT;
                    populateStandardData($scope.standardIds, firstCell, Math.min(firstCell + numCellsShowingPlusBuffer + 1, $scope.standardIds.length), $scope.standardsById);
                }
                function populateStandardData(standardIds, first, last, standardsById) {
                    var i, length, html = '';
                    for (i = first; i < last; i++) {
                        html += '<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + standardsById[standardIds[i]].name + '</div>';
                    }
                    $canvas.html(html);
                    for (i = first - 1; i >= Math.max(first - CELL_BUFFER_COUNT, 0); i--) {
                        $canvas.prepend('<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + $scope.standardsById[standardIds[i]].name + '</div>');
                    }
                }
                function setCanvasHeight() {
                    if ($scope.standardIds) {
                        $scope.style = {
                            'height': $scope.standardIds.length * $scope.cellHeight + 'px'
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