var app;
(function (app) {
    'use strict';
    var VirtualScroller = (function () {
        function VirtualScroller() {
            this.templateUrl = 'app/virtualScroller/virtualScroller.html';
            this.scope = {
                arr: '=',
                cellHeight: '=',
                buffer: '=',
                delayInMilliseconds: '=',
                top: '=',
                bottom: '=',
                left: '=',
                colWidth: '=',
                virtualData: '='
            };
            this.restrict = 'E';
            this.transclude = true;
            this.replace = true;
            VirtualScroller.prototype.link = function ($scope, element, attributes) {
                var canvas = element.children();
                setVirtualData();
                element.scrolled($scope.delayInMilliSeconds, function () {
                    setVirtualData();
                    $scope.$apply();
                });
                window.addEventListener('resize', function () {
                    setVirtualData();
                    $scope.$apply();
                });
                function setVirtualData() {
                    if (!$scope.canvasStyle) {
                        setCanvasHeight();
                    }
                    var firstVisible = Math.floor(element.scrollTop() / $scope.cellHeight);
                    var visibleColHeight = element.height();
                    var visibleCellCount = Math.round(visibleColHeight / $scope.cellHeight);
                    var lastVisible = firstVisible + visibleCellCount;
                    $scope.virtualData = $scope.arr.slice(firstVisible, lastVisible);
                    for (var i = 0, length_1 = $scope.virtualData.length; i < length_1; i++) {
                        $scope.virtualData[i].style = {
                            'top': (firstVisible + i) * $scope.cellHeight + "px"
                        };
                    }
                }
                function setCanvasHeight() {
                    $scope.canvasStyle = {
                        height: $scope.arr.length * $scope.cellHeight
                    };
                }
            };
        }
        VirtualScroller.Factory = function () {
            var directive = function () {
                return new VirtualScroller();
            };
            directive['$inject'] = [];
            return directive;
        };
        return VirtualScroller;
    })();
    angular
        .module("productManagement")
        .directive("virtualScroller", VirtualScroller.Factory());
})(app || (app = {}));
//# sourceMappingURL=virtualScroller.js.map