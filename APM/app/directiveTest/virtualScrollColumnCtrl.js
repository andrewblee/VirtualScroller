var app;
(function (app) {
    var VirtualScrollColumnCtrl = (function () {
        function VirtualScrollColumnCtrl($scope) {
            this.$scope = $scope;
            this.append = "hello this is append FROM VIRTUAL SCROLL speaking";
        }
        VirtualScrollColumnCtrl.$inject = ['$scope'];
        return VirtualScrollColumnCtrl;
    })();
    angular
        .module("productManagement")
        .controller("VirtualScrollColumnCtrl", VirtualScrollColumnCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollColumnCtrl.js.map