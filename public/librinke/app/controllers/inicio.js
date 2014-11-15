'use strict';

/* Controllers */
angular
    .module('app.controllers.inicio', [])

.controller('Inicio', ['$scope', '$location', 'api',
    function($scope, $location, api) {
        $scope.activetab = $location.path();

        $scope.load = function() {
            // slides da home
            // api.get('slides').then(function(data) {
            //     var slides = data.data;

            //     slides = slides.map(function(slide) {
            //         slide.imagem = JSON.parse(slide.imagem);

            //         return slide;
            //     });

            //     $scope.slides = slides;
            // });
            $scope.slides = [];

            // flexslider
            $scope.$watch('slides', function() {
                setTimeout(function() {
                    /* ******************************************** */
                    /*  JS for SLIDER REVOLUTION  */
                    /* ******************************************** */
                    jQuery('.tp-banner').revolution({
                        delay: 9000,
                        startheight: 500,
                        hideThumbs: 10,
                        navigationType: "bullet",
                        hideArrowsOnMobile: "on",
                        touchenabled: "on",
                        onHoverStop: "on",
                        navOffsetHorizontal: 0,
                        navOffsetVertical: 20,
                        stopAtSlide: -1,
                        stopAfterLoops: -1,
                        shadow: 0,
                        fullWidth: "on",
                        fullScreen: "off"
                    });

                    /* ******************************************** */
                    /*  JS for FlexSlider  */
                    /* ******************************************** */
                    // $('.flexslider-recent').flexslider({
                    //     animation: "fade",
                    //     animationSpeed: 1000,
                    //     controlNav: true,
                    //     directionNav: false
                    // });

                    // $('.flexslider-testimonial').flexslider({
                    //     animation: "fade",
                    //     slideshowSpeed: 5000,
                    //     animationSpeed: 1000,
                    //     controlNav: true,
                    //     directionNav: false
                    // });

                    /* Gallery */
                    // jQuery(".gallery-img-link").prettyPhoto({
                    //     overlay_gallery: false,
                    //     social_tools: false
                    // });
                }, 100);
            });
        };
    }
]);
