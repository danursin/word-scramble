(function(){
    angular.module("app.config", ["ui.router"])
        .config(function($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/home');
    
            $stateProvider
                
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    template: "<du-home></du-home>"
                });
        });
}());