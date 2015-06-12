'use strict';

/* Filters */
angular
    .module('panel.filters', [])

.filter('interpolate', ['version',
    function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
])
.filter('pagination', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    };
});
