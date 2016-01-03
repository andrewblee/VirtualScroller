var app;
(function (app) {
    'use strict';
    var MyDirective = (function () {
        function MyDirective() {
            this.templateUrl = 'directives/virtualScrollColumn/virtual-scroll-column.html';
            this.scope = {
                uiDataProvider: '='
            };
            this.restrict = 'AE';
            MyDirective.prototype.link = function ($scope, element, attributes) {
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
        MyDirective.Factory = function () {
            var directive = function () {
                return new MyDirective();
            };
            directive['$inject'] = [];
            return directive;
        };
        return MyDirective;
    })();
    angular
        .module("productManagement")
        .directive("myDirective", MyDirective.Factory());
})(app || (app = {}));
//# sourceMappingURL=virtualScrollColumn.js.map