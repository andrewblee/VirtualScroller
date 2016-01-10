module app {
    interface IVirtualScrollColumnModel {
        append: string;
        standardsById: app.IStandardsById;
        standardIds: number[];
        cellHeight: number;
    }

    class VirtualScrollColumnCtrl implements IVirtualScrollColumnModel {
        append: string;
        standardsById: app.IStandardsById;
        standardIds: number[];
        cellHeight: number;

        static $inject = ['$scope', 'standardService'];
        constructor(private $scope: IVirtualScrollColumnScope, private standardService: app.common.StandardService) {
            let that = this;
            this.append = "hello this is append FROM VIRTUAL SCROLL speaking";
            this.cellHeight = 100;

            getStandardsById();
            getStandardIds();

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