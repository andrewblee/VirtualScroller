module app.productList {
	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void;
    }
	
	class ProductListCtrl implements IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		
        static $inject = ["dataAccessService", '$scope'];
        constructor(private dataAccessService: app.common.DataAccessService, private $scope: IAppCtrlScope) {
			this.title = "Product List";
			this.showImage = false;
			this.products = [];
			
			var productResource = dataAccessService.getProductResource();
			productResource.query((data: app.domain.IProduct[]) => {
				this.products = data;
            });

            $scope.changeName = (name) => {
                $scope.greeting = 'Hello ' + name + ' !';
            }
		}
		
		toggleImage(): void {
			this.showImage = !this.showImage;
		}
	}
	angular
		.module("productManagement")
		.controller("ProductListCtrl",
			ProductListCtrl);
}