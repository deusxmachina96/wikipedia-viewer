(function() {
    var app = angular.module("filters", []);

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
})();
