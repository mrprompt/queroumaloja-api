'use strict';

/* Controllers */
angular
    .module('app.controllers.inicio', [])

.controller('Inicio', ['$scope', '$location', 'api',
    function($scope, $location, api) {
        $scope.activetab = $location.path();

        $scope.load = function() {
            // flexslider
            $scope.$watch('slides', function() {
                $('.flexslider').each(function() {
                    var sliderSettings = {
                        animation: $(this).attr('data-transition'),
                        selector: ".slides > .slide",
                        controlNav: true,
                        smoothHeight: true,
                        animationLoop: false,
                    };

                    var sliderNav = $(this).attr('data-slidernav');
                    if (sliderNav !== 'auto') {
                        sliderSettings = $.extend({}, sliderSettings, {
                            manualControls: sliderNav + ' li a',
                            controlsContainer: '.flexslider-wrapper'
                        });
                    }

                    $('#highlighted').removeClass('hidden');
                    $(this).flexslider(sliderSettings);
                });
            });

            if ($('#myModal')[0]) {
                $('#myModal').show().modal('show');
            }
        };
    }
]);