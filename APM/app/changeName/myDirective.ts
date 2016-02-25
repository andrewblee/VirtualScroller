module app {
    'use strict';
    export interface IAppCtrlScope extends ng.IScope {
        greeting: string;
        //changeName(name): void;
        //append: string;
        uiDataProvider: string;
    }

    class MyDirective {
        public link: ($scope: IAppCtrlScope, element: JQuery, attributes) => void;
        public templateUrl = 'app/changeName/template.html';
        public scope = {
            uiDataProvider: '='
        };
        public restrict = 'E';
        public transclude = true;

        constructor() {
            MyDirective.prototype.link = ($scope: IAppCtrlScope, element: JQuery, attributes) => {
                element.on('mouseenter', function () {
                    element.addClass('animate');
                })
                    .on('mouseleave', function () {
                        element.removeClass('animate');
                    })
                    .on('click', function () {
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