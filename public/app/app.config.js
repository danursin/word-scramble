(function () {
    angular.module("app.config", ["ui.router"])
        .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
            url: '/home',
            template: "<du-home></du-home>"
        });
    });
}());
//# sourceMappingURL=app.config.js.map