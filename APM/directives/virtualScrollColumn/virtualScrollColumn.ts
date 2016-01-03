module app {
    'use strict';
    export interface IVirtualScrollColumnScope extends ng.IScope {
        uiDataProvider: string;
    }

    class MyDirective {
        public link: ($scope: IVirtualScrollColumnScope, element: JQuery, attributes) => void;
        public templateUrl = 'directives/virtualScrollColumn/virtual-scroll-column.html';
        public scope = {
            uiDataProvider: '='
        };
        public restrict = 'AE';

        constructor() {
            MyDirective.prototype.link = ($scope: IAppCtrlScope, element: JQuery, attributes) => {
                element.on('click', function () {
                    var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                    changeName(name);
                    $scope.$apply();
                });

                function changeName(name) {
                    $scope.greeting = 'Hello ' + name + ' ! ' + $scope.uiDataProvider;
                }
            };
        }

        public static Factory() {
            var directive = () => {
                return new MyDirective();
            };

            directive['$inject'] = [];

            return directive;
        }
    }

    angular
        .module("productManagement")
        .directive("myDirective", MyDirective.Factory());
}