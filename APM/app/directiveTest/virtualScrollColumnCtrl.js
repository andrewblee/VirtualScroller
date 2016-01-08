var app;
(function (app) {
    var VirtualScrollColumnCtrl = (function () {
        function VirtualScrollColumnCtrl($scope, standardService) {
            this.$scope = $scope;
            this.standardService = standardService;
            var that = this;
            this.append = "hello this is append FROM VIRTUAL SCROLL speaking";
            getStandardsById();
            function getStandardsById() {
                that.standardsById = standardService.getStandardsById();
            }
        }
        VirtualScrollColumnCtrl.$inject = ['$scope', 'standardService'];
        return VirtualScrollColumnCtrl;
    })();
    angular
        .module("productManagement")
        .controller("VirtualScrollColumnCtrl", VirtualScrollColumnCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollColumnCtrl.js.map