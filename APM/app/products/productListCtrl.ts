module app.productList {
	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
        toggleImage(): void;
        append: string;
    }
	
	class ProductListCtrl implements IProductListModel {
		title: string;
		showImage: boolean;
        products: app.domain.IProduct[];
        append: string;
		
        static $inject = ["dataAccessService", '$scope'];
        constructor(private dataAccessService: app.common.DataAccessService, private $scope: IAppCtrlScope) {
			this.title = "Product List";
			this.showImage = false;
            this.products = [];
            this.append = "hello this is append speaking";
			
			var productResource = dataAccessService.getProductResource();
			productResource.query((data: app.domain.IProduct[]) => {
				this.products = data;
            });
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