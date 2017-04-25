(function(){
    angular.module("dictionary.service", [])
        .service("dictionaryService", DictionaryService);

    DictionaryService.$inject = ["$http"];

    function DictionaryService($http){
        const service = this;

        service.getResults = function(word: string, limit: number = 0){
            limit = limit || 3;
            return $http({
                method: "GET",
                url: `http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=${word}&limit=${limit}`
            });
        };

        return this;
    }

}());