module app {
    interface IVirtualScrollColumnModel {
        append: string;
    }

    class VirtualScrollColumnCtrl implements IVirtualScrollColumnModel {
        append: string;

        static $inject = ['$scope'];
        constructor(private $scope: IVirtualScrollColumnScope) {
            this.append = "hello this is append FROM VIRTUAL SCROLL speaking";
        }
    }
    angular
        .module("productManagement")
        .controller("VirtualScrollColumnCtrl",
        VirtualScrollColumnCtrl);
}