$(document).ready(function () {

    //#region Initialize Bootstrap Components
    $("[data-toggle='tooltip']").tooltip();

    $("[data-toggle='popover']").click(function (evt) { evt.preventDefault() }).popover();

    //#endregion

    //#region Main Slider
    var sliderOptions = {
        autoPlay: true,
        autoPlayDelay: 5000,
        animateStartingFrameIn: true,
        reverseAnimationsWhenNavigatingBackwards: false,
        fadeFrameTime: 500,
        nextButton: ".next-slide",
        prevButton: ".prev-slide",
        pagination: ".page-slider-pagination",
        pauseButton: ".play-pause-page-slider",
        preloader:true
    }
    var mainSlider = $("#sequence").sequence(sliderOptions).data("sequence");
    //#endregion  Slider


    //#region On Scroll Animation(Requires Waypoint.js)
    $('[data-animation-delay]').each(function () {
        var animationDelay = $(this).data("animation-delay");
        $(this).css({
            "-webkit-animation-delay": animationDelay,
            "-moz-animation-delay": animationDelay,
            "-o-animation-delay": animationDelay,
            "-ms-animation-delay": animationDelay,
            "animation-delay": animationDelay
        });

    });
    $('[data-animation]').waypoint(function (direction) {
        if (direction == "down") {
            $(this).addClass("animated " + $(this).data("animation"));

        }
    }, {
        offset: $(window).height() - 100
    }).waypoint(function (direction) {
        if (direction == "up") {
            $(this).removeClass("animated " + $(this).data("animation"));

        }
    }, {
        offset: $(window).height()
    })
    //#endregion


    //#region Active links menu
    $('.page-section[id]')
     .waypoint(function (direction) {
         var $links = $('a[href="#' + this.id + '"]').parent("li");
         $links.toggleClass('active');
     }, {
         offset: 120
     })
     .waypoint(function (direction) {
         var $links = $('a[href="#' + this.id + '"]').parent("li");
         $links.toggleClass('active');
     }, {
         offset: function () {
             return -$(this).height() + 120;
         }
     });
    $(window).scroll(function () {
        if ($(document).scrollTop() < 400) {
            $("a[href='#home']").parent("li").addClass("active");
        }
        else {
            $("a[href='#home']").parent("li").removeClass("active");
        }
    });
    //#endregion


    //#region On scroll Header Toggle And  Animations

    var pageHeader = $(".page-header");
    var pageSlider = $(".page-slider");
    var pageAboutUS = $(".about-us");

    pageSlider.waypoint(function (direction) {
        if (direction == "up") {
            pageHeader.removeClass("scrolled");
        }
        else {
            pageHeader.addClass("scrolled");

        }
    }, { offset: -10 });
    pageSlider.waypoint(function (direction) {
        if (direction == "up") {
            pageHeader.removeClass("transition");
        }
        else {
            pageHeader.addClass("transition");

        }
    }, { offset: -400 });
    pageAboutUS.waypoint(function (direction) {
        if (direction == "up") {
            pageHeader.removeClass("header-fixed");
        }
        else {
            pageHeader.addClass("header-fixed");

        }
    }, { offset: 80 });
    pageHeader.waypoint("sticky");


    //#endregion


    //#region Page Scrolling On Menu click
    $(".page-top-nav a").click(function (evt) {
        evt.preventDefault();
        var scrollToLocation = $($(this).attr("href")).offset().top;
        $("html,body").animate({ scrollTop: scrollToLocation - 80 }, 400);
        $(this).closest(".nav-collapse").removeClass("in").css('height', 0);
    });
    //#endregion Page Scrolling On Menu click




    //#region Testimonial Slider
    var testimonialSlider = $(".testimonial-slider").bxSlider({
        adaptiveHeight: true,
        pager: false,
        controls: false,
        auto: true,
        pause: 8000
    });
    $(".testimonial-prev").click(function (evt) {
        evt.preventDefault();
        testimonialSlider.goToPrevSlide();
    });
    $(".testimonial-next").click(function (evt) {
        evt.preventDefault();
        testimonialSlider.goToNextSlide();
    });
    //#endregion Testimonial Slider

    //#region Blog Post Slider
    var blogPostSlider = $(".post-slider").bxSlider({
        adaptiveHeight: true,
        pager: false,
        controls: false,
        mode: "vertical",
        minSlides: 2,
        maxSlides: 2,
        auto: true,
        pause: 5000,

    });
    $(".post-prev").click(function (evt) {
        evt.preventDefault();
        blogPostSlider.goToPrevSlide();
    });
    $(".post-next").click(function (evt) {
        evt.preventDefault();
        blogPostSlider.goToNextSlide();
    });
    //#endregion Blog Post Slider



    



    //#region Chage Theme
    if ($("#theme-btn").length > 0) {
        $("#theme-btn").click(function () {
            $(".themes-section").toggleClass("open");
        });
    }
    //#endregion
});

//#region Gmap
var map;
function initialize() {
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(34.052234, -117.243685),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap'),
        mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

//#endregion Gmap
