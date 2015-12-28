var app;
(function (app) {
    'use strict';
    function changeName() {
        return {
            templateUrl: 'app/changeName/template.html',
            restrict: 'AE',
            scope: false,
            link: function ($scope, element, attributes) {
                element.on('mouseenter', function () {
                    element.addClass('animate');
                })
                    .on('mouseleave', function () {
                    element.removeClass('animate');
                })
                    .on('click', function () {
                    var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                    $scope.changeName(name);
                    $scope.$apply();
                });
            }
        };
    }
    app.changeName = changeName;
    ;
    angular
        .module("productManagement")
        .directive("changeName", changeName);
})(app || (app = {}));
//# sourceMappingURL=changeName.js.map