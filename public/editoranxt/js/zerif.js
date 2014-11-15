/* ================================
===  BACKGROUND SLIDER        ====
================================= */
$.vegas('slideshow', {
    delay: 7000,
    backgrounds: [{
        src: 'nxtchallenger/images/backgrounds/bg1.jpg',
        fade: 1000
    }, {
        src: 'nxtchallenger/images/backgrounds/bg2.jpg',
        fade: 1000
    }, {
        src: 'nxtchallenger/images/backgrounds/bg3.jpg',
        fade: 1000
    }]
});


/* =================================
   LOADER
=================================== */
// makes sure the whole site is loaded
jQuery(window).load(function() {
    // will first fade out the loading animation
    jQuery(".status").fadeOut();
    // will fade out the whole DIV that covers the website.
    jQuery(".preloader").delay(1000).fadeOut("slow");
})


/* =================================
===  Bootstrap Fix              ====
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}

/* =================================
===  STICKY NAV                 ====
=================================== */

$(document).ready(function() {
    $('.main-nav-list').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 75 //Height of Navigation Bar
    });

    // Sticky Header - http://jqueryfordesigners.com/fixed-floating-elements/
    var top = $('#main-nav').offset().top - parseFloat($('#main-nav').css('margin-top').replace(/auto/, 0));

    $(window).scroll(function(event) {
        // what the y position of the scroll is
        var y = $(this).scrollTop();

        // whether that's below the form
        if (y >= top) {
            // if so, ad the fixed class
            $('#main-nav').addClass('fixed');
        } else {
            // otherwise remove it
            $('#main-nav').removeClass('fixed');
        }
    });

});


/*=================================
===  OWL CROUSEL               ====
===================================*/
$(document).ready(function() {
    var owl = $("#client-feedbacks");
    owl.owlCarousel({
        items: 3, //10 items above 1000px browser width
        itemsDesktop: [1000, 2], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });
});


/*=================================
===  SMOOTH SCROLL             ====
=================================== */
var scrollAnimationTime = 1200,
    scrollAnimation = 'easeInOutExpo';
$('a.scrollto').bind('click.smoothscroll', function(event) {
    event.preventDefault();
    var target = this.hash;
    $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
    }, scrollAnimationTime, scrollAnimation, function() {
        window.location.hash = target;
    });
});




/* ================================
===  PROJECT LOADING           ====
================================= */

jQuery(document).ready(function($) {
    $('.more').on('click', function(event) {
        event.preventDefault();

        var href = $(this).attr('href') + ' .single-project',
            portfolioList = $('#portfolio-list'),
            content = $('#loaded-content');

        portfolioList.animate({
            'marginLeft': '-120%'
        }, {
            duration: 400,
            queue: false
        });
        portfolioList.fadeOut(400);
        setTimeout(function() {
            $('#loader').show();
        }, 400);
        setTimeout(function() {
            content.load(href, function() {
                $('#loaded-content meta').remove();
                $('#loader').hide();
                content.fadeIn(600);
                $('#back-button').fadeIn(600);
            });
        }, 800);

    });

    $('#back-button').on('click', function(event) {
        event.preventDefault();

        var portfolioList = $('#portfolio-list')
        content = $('#loaded-content');

        content.fadeOut(400);
        $('#back-button').fadeOut(400);
        setTimeout(function() {
            portfolioList.animate({
                'marginLeft': '0'
            }, {
                duration: 400,
                queue: false
            });
            portfolioList.fadeIn(600);
        }, 800);
    });
});

/* ================================
===  PARALLAX                  ====
================================= */
$(document).ready(function() {
    var $window = $(window);
    $('div[data-type="background"], header[data-type="background"], section[data-type="background"]').each(function() {
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({
                backgroundPosition: coords
            });
        });
    });
});


/* =================================
===  WOW ANIMATION             ====
=================================== */
new WOW().init();

/* =================================
===  GOOGLE ANALYTICS             ====
=================================== */
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-55392617-1', 'auto');
ga('send', 'pageview');
