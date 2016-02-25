var app;
(function (app) {
    var VirtualScrollerCtrl = (function () {
        function VirtualScrollerCtrl($scope, standardService) {
            this.$scope = $scope;
            this.standardService = standardService;
            var that = this;
            this.cellHeight = 100;
            that.test = test;
            function test() {
                that.standardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            }
            getStandardsById();
            getStandardIds();
            getStandards();
            function getStandards() {
                that.standards = standardService.getStandards();
            }
            function getStandardIds() {
                that.standardIds = standardService.getStandardIds();
            }
            function getStandardsById() {
                that.standardsById = standardService.getStandardsById();
            }
        }
        VirtualScrollerCtrl.$inject = ['$scope', 'standardService'];
        return VirtualScrollerCtrl;
    })();
    angular.module("productManagement").controller("VirtualScrollerCtrl", VirtualScrollerCtrl);
})(app || (app = {}));
//# sourceMappingURL=virtualScrollerCtrl.js.map