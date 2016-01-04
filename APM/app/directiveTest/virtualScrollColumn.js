var app;
(function (app) {
    'use strict';
    var VirtualScrollColumn = (function () {
        function VirtualScrollColumn() {
            this.templateUrl = 'app/directiveTest/virtual-scroll-column.html';
            this.scope = {
                uiDataProvider: '='
            };
            this.restrict = 'AE';
            VirtualScrollColumn.prototype.link = function ($scope, element, attributes) {
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
        VirtualScrollColumn.Factory = function () {
            var directive = function () {
                return new VirtualScrollColumn();
            };
            directive['$inject'] = [];
            return directive;
        };
        return VirtualScrollColumn;
    })();
    angular
        .module("productManagement")
        .directive("virtualScrollColumn", VirtualScrollColumn.Factory());
})(app || (app = {}));
//# sourceMappingURL=virtualScrollColumn.js.map