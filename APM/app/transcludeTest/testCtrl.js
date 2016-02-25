var app;
(function (app) {
    var TestCtrl = (function () {
        function TestCtrl($scope) {
            this.$scope = $scope;
        }
        TestCtrl.$inject = ['$scope'];
        return TestCtrl;
    })();
    angular
        .module("productManagement")
        .controller("TestCtrl", TestCtrl);
})(app || (app = {}));
//# sourceMappingURL=testCtrl.js.map