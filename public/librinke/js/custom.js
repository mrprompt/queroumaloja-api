/* *************************************** */
/* Cart Button Drop Down */
/* *************************************** */

$(document).ready(function() {
    $('.btn-cart-md .cart-link').click(function(e) {
        e.preventDefault();
        var $dd_menu = $('.btn-cart-md .cart-dropdown')
        if ($dd_menu.hasClass('open')) {
            $dd_menu.fadeOut();
            $dd_menu.removeClass('open');
        } else {
            $dd_menu.fadeIn();
            $dd_menu.addClass('open');
        }
    });
});

/* *************************************** */
/* Tool Tip JS */
/* *************************************** */

$('.my-tooltip').tooltip();

/* *************************************** */
/* Scroll to Top */
/* *************************************** */

$(document).ready(function() {
    $(".totop").hide();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.totop').fadeIn();
        } else {
            $('.totop').fadeOut();
        }
    });
    $(".totop a").click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });

});
/* *************************************** */

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

ga('create', 'UA-55394102-1', 'auto');
ga('send', 'pageview');

window.fbAsyncInit = function() {
    FB.init({
        appId: '835203316501577',
        xfbml: true,
        version: 'v2.1'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));