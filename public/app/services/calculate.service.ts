(function(){
    angular.module("calculate.service", [])
        .service("calculateService", CalculateService);

    CalculateService.$inject = [];

    function CalculateService($http){
        const service = this;

        service.getPermutations = function(inputArr){
            var results = [];
            function permute(arr, memo?: any) {
                var cur, memo = memo || [];

                for (var i = 0; i < arr.length; i++) {
                    cur = arr.splice(i, 1);
                    if (arr.length === 0) {
                        results.push(memo.concat(cur));
                    }
                    permute(arr.slice(), memo.concat(cur));
                    arr.splice(i, 0, cur[0]);
                }
                return results;
            }
            return permute(inputArr);
        };

        return this;
    }

}());