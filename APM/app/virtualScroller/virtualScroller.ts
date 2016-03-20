module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        person: any;
        header: string;
        arr: Array<any>;
        cellHeight: number;
        buffer: number;
        delayInMilliSeconds: number;
        colStyle: {};
        canvasStyle: {};
        top: number;
        bottom: number;
        left: number;
        colWidth: number;
        virtualData: Array<any>;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
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
        public restrict = 'E';
        public transclude = true;
        public replace = true;

        constructor() {
            VirtualScroller.prototype.link = ($scope: IVirtualScrollerScope, element: JQuery, attributes) => {
                let canvas = element.children();

                setVirtualData();

                (<any>element).scrolled($scope.delayInMilliSeconds, function () {
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

                    let firstVisible = Math.floor(element.scrollTop() / $scope.cellHeight);
                    let visibleColHeight = element.height();
                    let visibleCellCount = Math.round(visibleColHeight / $scope.cellHeight);
                    let lastVisible = firstVisible + visibleCellCount;

                    $scope.virtualData = $scope.arr.slice(firstVisible, lastVisible);

                    for (let i = 0, length = $scope.virtualData.length; i < length; i++) {
                        $scope.virtualData[i].style = {
                            'top': (firstVisible + i) * $scope.cellHeight + "px"
                        }
                    }
                }

                function setCanvasHeight(): void {
                    $scope.canvasStyle = {
                        height: $scope.arr.length * $scope.cellHeight
                    }
                }
            };
        }

        public static Factory() {
            var directive = () => {
                return new VirtualScroller();
            };

            directive['$inject'] = [];

            return directive;
        }
    }


    angular
        .module("productManagement")
        .directive("virtualScroller", VirtualScroller.Factory());
}