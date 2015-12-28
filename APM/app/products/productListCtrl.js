var app;
(function (app) {
    var productList;
    (function (productList) {
        var ProductListCtrl = (function () {
            function ProductListCtrl(dataAccessService, $scope) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.$scope = $scope;
                this.title = "Product List";
                this.showImage = false;
                this.products = [];
                var productResource = dataAccessService.getProductResource();
                productResource.query(function (data) {
                    _this.products = data;
                });
                $scope.changeName = function (name) {
                    $scope.greeting = 'Hello ' + name + ' !';
                };
            }
            ProductListCtrl.prototype.toggleImage = function () {
                this.showImage = !this.showImage;
            };
            ProductListCtrl.$inject = ["dataAccessService", '$scope'];
            return ProductListCtrl;
        })();
        angular
            .module("productManagement")
            .controller("ProductListCtrl", ProductListCtrl);
    })(productList = app.productList || (app.productList = {}));
})(app || (app = {}));
//# sourceMappingURL=productListCtrl.js.map