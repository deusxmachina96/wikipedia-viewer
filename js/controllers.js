(function() {

    var app = angular.module("wikiApp", ["ngTouch", "ngSanitize", "filters"]);

    app.controller("WikiSearchCtrl", ["$scope", "$http", function($scope, $http) {
        $scope.data = [];
        $scope.error = null;
        $scope.search = function(title) {
            console.log("called");
            $http.jsonp("https://en.wikipedia.org/w/api.php?exintro&explaintext&exsentences=1&exlimit=max", {
                params: {
                    action: "query",
                    generator: "search",
                    gsrnamespace: 0,
                    gsrsearch: title,
                    prop: "extracts",
                    format: "json",
                    callback: "JSON_CALLBACK"
                }
            }).then(function(response) {
                //success
                console.log(response);
                if (response.data.error != null) {
                    $scope.error = response.data.error.info;
                } else {
                    $scope.data = response.data.query.pages;
                }
            }, function(response) {
                //error
                console.log('error');
            });
        };
    }]);

})();
