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
                setCanvasHeight();
                element.find('.header-col').scrolled(80, function () {
                    console.log('hello from scrolled');
                });
                var html = '';
                for (var i = 0, length_1 = $scope.standardIds.length; i < length_1; i++) {
                    html += '<div class="header-col-box" style="top:' + i * $scope.cellHeight + 'px">' + $scope.standardsById[$scope.standardIds[i]].name + '</div>';
                }
                element.find('.header-col').html(html);
                element.on('click', function () {
                    $scope.$apply();
                });
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