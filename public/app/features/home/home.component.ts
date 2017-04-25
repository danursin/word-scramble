(function(){
    angular.module("home.component", [])
        .component("duHome", {
            bindings: {},
            templateUrl: "/app/features/home/home.component.template.html",
            controller: HomeComponentController
        });

    HomeComponentController.$inject = ["dictionaryService", "calculateService", "$q"];

    function HomeComponentController(dictionaryService, calculateService, $q){
        const ctrl = this;
        
        function getWordResult(word){
            dictionaryService.getResults(word)
                .then(response => {
                    ctrl.results = response.data;
                });
        }

        function batchRequests(requests, callback){
            const batchSize = 5;
            const requestBatch = requests.splice(0, batchSize);
            var promises = _.map(requestBatch, (request: any) => {
                return dictionaryService.getResults(request.word).then(response => {
                    if(response.data.results.length){
                        console.log(`Found data for ${request.word}`);
                        ctrl.results.push(response.data.results[0]);
                    }
                });
            });
            
            $q.all(promises).then(function(){
                if(requests.length){
                    batchRequests(requests, callback);
                } else{
                    callback(ctrl.results);
                }
            });
        };

        ctrl.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        ctrl.primaryLetter = "A";
        ctrl.otherLetters = [
            { letter: "B" },
            { letter: "D" }
        ];
        
        ctrl.results = [];

        ctrl.addLetter = function(){
            ctrl.otherLetters.push({letter: "A"});
        };

        ctrl.removeLetter = function(index){
            ctrl.otherLetters.splice(index, 1);
        };

        ctrl.otherLetterList = function(){
            return _.map(ctrl.otherLetters, "letter").join(", ");
        };

        ctrl.onSubmit = function(){
            ctrl.results = [];
            var letters = [].concat([ctrl.primaryLetter], _.map(ctrl.otherLetters, "letter"));
            var requests = _.uniqBy(_.map(calculateService.getPermutations(letters), function(arr: any){
                return { word: arr.join("") };
            }), "word");

            batchRequests(requests, function(results){
                ctrl.results = results;
            });
        };

        ctrl.$onInit = function(){
            
        };
    }
    
}());