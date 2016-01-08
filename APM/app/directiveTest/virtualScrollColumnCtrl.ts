module app {
    interface IVirtualScrollColumnModel {
        append: string;
        standardsById: app.IStandardsById;
    }

    class VirtualScrollColumnCtrl implements IVirtualScrollColumnModel {
        append: string;
        standardsById: app.IStandardsById;

        static $inject = ['$scope', 'standardService'];
        constructor(private $scope: IVirtualScrollColumnScope, private standardService: app.common.StandardService) {
            let that = this;
            this.append = "hello this is append FROM VIRTUAL SCROLL speaking";

            getStandardsById();

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