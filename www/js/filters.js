angular.module('myFilters', [])
    .filter('reducedZipcode', function() {
        return function(input) {
            if (!input) return;
            return input.toString().substr(3,2);
        };
    })

    .filter('time', function() {
        return function(input) {
            if (!input) return;
            return input.substr(0,5);
        };
    })
;