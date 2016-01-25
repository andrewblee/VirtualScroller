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
        test: Function;

        static $inject = ['$scope', 'standardService'];
        constructor(private $scope: IVirtualScrollColumnScope, private standardService: app.common.StandardService) {
            let that = this;
            this.cellHeight = 100;
            that.test = test;
            
            function test(): void {
                that.standardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            }

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