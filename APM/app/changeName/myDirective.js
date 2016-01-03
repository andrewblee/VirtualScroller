var app;
(function (app) {
    'use strict';
    var MyDirective = (function () {
        function MyDirective() {
            this.templateUrl = 'app/changeName/template.html';
            this.scope = false;
            this.restrict = 'AE';
            MyDirective.prototype.link = function ($scope, element, attributes) {
                element.on('mouseenter', function () {
                    element.addClass('animate');
                })
                    .on('mouseleave', function () {
                    element.removeClass('animate');
                })
                    .on('click', function () {
                    var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                    $scope.changeName(name + ' from my directive');
                    $scope.$apply();
                });
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
//# sourceMappingURL=myDirective.js.map