(function() {

    var app = angular.module("wikiApp", ["ngTouch"]);

    app.controller("WikiSearchCtrl", ["$scope", "$http", function($scope, $http) {
        $scope.data = [];
        $scope.autocompleteData = [];
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

        $scope.randomSearch = function() {

        	$http.jsonp("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: "random",
                    rnnamespace: 0,
                    rnlimit: 1,
                    format: "json",
                    callback: "JSON_CALLBACK"
                }
            }).then(function(response) {
                window.open("https://en.wikipedia.org/?curid=" + response.data.query.random[0].id);
                console.log(response);
            }, function(response) {
                //error
                console.log('error');
            });
        }

        $scope.autocomplete = function(title) {
        	$scope.autocompleteData = [];
        	$http.jsonp("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "opensearch",
                    search: title,
                    namespace: 0,
                    limit: 10,
                    format: "json",
                    callback: "JSON_CALLBACK"
                }
            }).then(function(response) {
            	for(var i = 0; i < response.data[1].length; i++) {	
            		$scope.autocompleteData.push({
	            		text: response.data[1][i],
	            		link: response.data[3][i]
	            	});
            	}
                console.log(response);
            }, function(response) {
                //error
                console.log('error');
            });
        }
    }]);

})();
