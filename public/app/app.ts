(function(){
    angular.module("app", [
        "ui.router",

        "app.config",
        "calculate.service",
        "dictionary.service",
        "home.component"
    ]);
}());