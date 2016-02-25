module app {
    class TestCtrl {
        static $inject = ['$scope'];
        constructor(private $scope: angular.IScope) {

        }
    }
    angular
        .module("productManagement")
        .controller("TestCtrl",
        TestCtrl);
}