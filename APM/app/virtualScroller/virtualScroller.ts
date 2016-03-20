module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        arr: Array<any>;
        colStyle: {};
        canvasStyle: {};
        virtualData: Array<any>;
    }

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            arr: '=',
            virtualData: '='
        };
        public restrict = 'E';
        public transclude = true;
        public replace = true;

        constructor() {
            VirtualScroller.prototype.link = ($scope: IVirtualScrollerScope, element: JQuery, attributes) => {
                let canvas = element.children();

                setVirtualData();

                (<any>element).scrolled(30, function () {
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

                    let firstVisible = Math.floor(element.scrollTop() / attributes.cellHeight);
                    let visibleColHeight = element.height();
                    let visibleCellCount = Math.round(visibleColHeight / attributes.cellHeight);
                    let lastVisible = firstVisible + visibleCellCount;

                    $scope.virtualData = $scope.arr.slice(firstVisible, lastVisible);

                    for (let i = 0, length = $scope.virtualData.length; i < length; i++) {
                        $scope.virtualData[i].style = {
                            'top': (firstVisible + i) * attributes.cellHeight + "px"
                        }
                    }
                }

                function setCanvasHeight(): void {
                    $scope.canvasStyle = {
                        height: $scope.arr.length * attributes.cellHeight
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