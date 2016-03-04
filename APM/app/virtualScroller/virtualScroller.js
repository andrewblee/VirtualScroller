var app;
(function (app) {
    'use strict';
    var VirtualScroller = (function () {
        function VirtualScroller() {
            this.templateUrl = 'app/virtualScroller/virtualScroller.html';
            this.scope = {
                header: '=',
            };
            this.restrict = 'E';
            this.transclude = true;
            VirtualScroller.prototype.link = function (scope, element, attributes) {
                scope.header = 'hi from directive';
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