module app {
    'use strict';

    export interface IVirtualScrollerScope extends ng.IScope {
        person: any;
        header: string;
        arr: Array<number>;
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

    class VirtualScroller {
        public link: ($scope: IVirtualScrollerScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/virtualScroller/virtualScroller.html';
        public scope = {
            header: '=',
            arr: '=',
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
            VirtualScroller.prototype.link = ($scope: IVirtualScrollerScope, element: JQuery, attributes) => {
                let $column = element.find('.virtual-scroll-col');
                let $canvas = element.find('.canvas');

                $scope.header = 'hi from directive';
                $scope.arr = [1, 2, 3, 4];

                setDefaultValues();
                validateScope();
                configureStyle();

                function configureStyle(): void {
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
                    }
                }

                function setDefaultValues(): void {
                    let DEFAULT_BUFFER = 3;
                    let DEFAULT_DELAY_IN_MILLISECONDS = 80;
                    let DEFAULT_BOT = 0;
                    let DEFAULT_LEFT = 0;
                    let DEFAULT_TOP = 0;

                    $scope.buffer = $scope.buffer || DEFAULT_BUFFER;
                    $scope.delayInMilliSeconds = $scope.delayInMilliSeconds || DEFAULT_DELAY_IN_MILLISECONDS;
                    $scope.bottom = $scope.bottom || DEFAULT_BOT;
                    $scope.left = $scope.left || DEFAULT_LEFT;
                    $scope.top = $scope.top || DEFAULT_TOP;
                }

                function validateScope(): void {
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