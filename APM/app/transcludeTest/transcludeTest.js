var app;
(function (app) {
    'use strict';
    var TranscludeTest = (function () {
        function TranscludeTest() {
            this.templateUrl = '<div><span>hihihihihihihihi</span></div>';
            this.restrict = 'E';
            this.transclude = true;
        }
        TranscludeTest.Factory = function () {
            var directive = function () {
                return new TranscludeTest();
            };
            directive['$inject'] = [];
            return directive;
        };
        return TranscludeTest;
    })();
    angular
        .module("productManagement")
        .directive("TranscludeTest", TranscludeTest.Factory());
})(app || (app = {}));
//# sourceMappingURL=transcludeTest.js.map