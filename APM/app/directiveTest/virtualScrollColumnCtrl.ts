module app {
    interface IVirtualScrollColumnModel {
        standardsById: common.IStandardsById;
        standardIds: number[];
        cellHeight: number;
    }

    class VirtualScrollColumnCtrl implements IVirtualScrollColumnModel {
        standardsById: common.IStandardsById;
        standardIds: number[];
        standards: common.IStandard[];
        cellHeight: number;

        static $inject = ['$scope', 'standardService'];
        constructor(private $scope: IVirtualScrollColumnScope, private standardService: app.common.StandardService) {
            let that = this;
            this.cellHeight = 100;

            getStandardsById();
            getStandardIds();
            getStandards();

            function getStandards(): void {
                that.standards = standardService.getStandards();
            }

            function getStandardIds(): void {
                that.standardIds = standardService.getStandardIds();
            }

            function getStandardsById() : void {
                that.standardsById = standardService.getStandardsById();
            }
        }
    }
    angular
        .module("productManagement")
        .controller("VirtualScrollColumnCtrl",
        VirtualScrollColumnCtrl);
}