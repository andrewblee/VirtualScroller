module app {
    'use strict';
    export interface IAppCtrlScope extends ng.IScope {
        greeting: string;
        changeName(name): void;
    }

    export function changeName(): ng.IDirective {
        return {
            templateUrl: 'app/changeName/template.html',
            restrict: 'AE',
            scope: false, // use controller scope
            link: ($scope: IAppCtrlScope, element: JQuery, attributes) => {
                element.on('mouseenter', function () {
                    element.addClass('animate');
                })
                    .on('mouseleave', function () {
                        element.removeClass('animate');
                    })
                    .on('click', function () {
                        var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                        $scope.changeName(name);
                        $scope.$apply();
                    });
            }
        }
    };

    angular
        .module("productManagement")
        .directive("changeName",
        changeName);
}