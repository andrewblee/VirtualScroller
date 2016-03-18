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
                setCanvasHeight();
                setVirtualData();
                setDefaultValues();
                validateScope();
                configureStyle();
                element.scrolled($scope.delayInMilliSeconds, function () {
                    setVirtualData();
                    $scope.$apply();
                });
                window.addEventListener('resize', function () {
                    setVirtualData();
                    $scope.$apply();
                });
                function configureStyle() {
                    $scope.colStyle = {
                        'position': 'absolute',
                        'top': $scope.top,
                        'bottom': $scope.bottom,
                        'left': $scope.left,
                        'width': $scope.colWidth,
                        'overflow-x': 'hidden',
                        'overflow-y': 'auto'
                    };
                    $scope.canvasStyle = {
                        'position': 'relative'
                    };
                }
                function setVirtualData() {
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
                    canvas.height($scope.arr.length * $scope.cellHeight);
                }
                function setDefaultValues() {
                    var DEFAULT_BUFFER = 3;
                    var DEFAULT_DELAY_IN_MILLISECONDS = 80;
                    var DEFAULT_BOT = 0;
                    var DEFAULT_LEFT = 0;
                    var DEFAULT_TOP = 0;
                    $scope.buffer = $scope.buffer || DEFAULT_BUFFER;
                    $scope.delayInMilliSeconds = $scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                    $scope.bottom = $scope.bottom || DEFAULT_BOT;
                    $scope.left = $scope.left || DEFAULT_LEFT;
                    $scope.top = $scope.top || DEFAULT_TOP;
                }
                function validateScope() {
                    //if (!$scope.data) {
                    //    throw new Error('data must be defined.');
                    //}
                    if ($scope.cellHeight === undefined || $scope.cellHeight <= 0) {
                        throw new Error('cellHeight is invalid.');
                    }
                    if ($scope.buffer === undefined || $scope.buffer < 0) {
                        throw new Error('cellBuffer is invalid.');
                    }
                    if ($scope.delayInMilliSeconds === undefined || $scope.delayInMilliSeconds <= 0) {
                        throw new Error('delayInMilliSeconds is invalid.');
                    }
                    if ($scope.top === undefined || $scope.top < 0) {
                        throw new Error('top is invalid.');
                    }
                    if ($scope.left === undefined || $scope.left < 0) {
                        throw new Error('left is invalid.');
                    }
                    if ($scope.bottom === undefined || $scope.bottom < 0) {
                        throw new Error('bottom is invalid.');
                    }
                    if ($scope.colWidth === undefined || $scope.colWidth <= 0) {
                        throw new Error('cellWidth is invalid.');
                    }
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