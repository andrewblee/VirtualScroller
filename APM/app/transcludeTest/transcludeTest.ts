module app {
    'use strict';

    class TranscludeTest {
        public templateUrl = '<div><span>hihihihihihihihi</span></div>';
        public restrict = 'E';
        public transclude = true;

        constructor() {
        }

        public static Factory() {
            var directive = () => {
                return new TranscludeTest();
            };

            directive['$inject'] = [];

            return directive;
        }
    }

    angular
        .module("productManagement")
        .directive("TranscludeTest", TranscludeTest.Factory());
}