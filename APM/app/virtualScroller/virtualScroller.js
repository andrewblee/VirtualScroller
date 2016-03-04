var app;
(function (app) {
    'use strict';
    var VirtualScroller = (function () {
        function VirtualScroller() {
            this.templateUrl = 'app/virtualScroller/virtualScroller.html';
            this.scope = {
                greeting: '=',
                arr: '='
            };
            this.restrict = 'E';
            this.transclude = true;
            VirtualScroller.prototype.link = function (scope, element, attributes, ctlr, transclude) {
                scope.greeting = 'hi from directive';
                scope.arr = [1, 2, 3];
                console.log('hello');
                transclude(scope, function (clone, scope) {
                    element.append(clone);
                });
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