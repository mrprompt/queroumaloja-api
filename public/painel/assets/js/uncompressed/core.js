/* -------------------- Check Browser --------------------- */
function browser() {

    var isOpera = !!(window.opera && window.opera.version); // Opera 8.0+
    var isFirefox = testCSS('MozBoxSizing'); // FF 0.8+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !isSafari && testCSS('WebkitTransform'); // Chrome 1+
    //var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

    function testCSS(prop) {
        return prop in document.documentElement.style;
    }

    if (isOpera) {

        return false;

    } else if (isSafari || isChrome) {

        return true;

    } else {

        return false;

    }

}

jQuery(document).ready(function($) {

    /* ---------- Remove elements in IE8 ---------- */
    if (jQuery.browser.version.substring(0, 2) == "8.") {

        $('.hideInIE8').remove();

    }

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function(e) {
        e.preventDefault();
    });

    /* ---------- Notifications ---------- */
    $('.noty').click(function(e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });


    /* ---------- Tabs ---------- */
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /* ---------- Tooltip ---------- */
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({
        "placement": "bottom",
        delay: {
            show: 400,
            hide: 200
        }
    });

    /* ---------- Popover ---------- */
    $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

    $('.btn-close').click(function(e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function(e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('fa fa-chevron-up').addClass('fa fa-chevron-down');
        else $('i', $(this)).removeClass('fa fa-chevron-down').addClass('fa fa-chevron-up');
        $target.slideToggle('slow', function() {
            widthFunctions();
        });

    });
    $('.btn-setting').click(function(e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });

});


/* ---------- Delete Comment ---------- */
jQuery(document).ready(function($) {
    $('.discussions').find('.delete').click(function() {

        $(this).parent().fadeTo("slow", 0.00, function() { //fade
            $(this).slideUp("slow", function() { //slide up
                $(this).remove(); //then remove from the DOM
            });
        });

    });
});

/* ---------- IE8 list style hack (:nth-child(odd)) ---------- */
jQuery(document).ready(function($) {

    if ($('.messagesList').width()) {

        if (jQuery.browser.version.substring(0, 2) == "8.") {

            $('ul.messagesList li:nth-child(2n+1)').addClass('odd');

        }

    }

});


/* ---------- Check Retina ---------- */
function retina() {

    retinaMode = (window.devicePixelRatio > 1);

    return retinaMode;

}

function activeMenu() {
    /* ---------- Add class .active to current link  ---------- */
    $('ul.main-menu li a').each(function() {
        $(this).parent().removeClass('active');

        if ($($(this))[0].href == String(window.location)) {

            $(this).parent().addClass('active');

        }

    });

    $('ul.main-menu li ul li a').each(function() {

        $(this).parent().removeClassClass('active');
        $(this).parent().parent().parent().removeClass('active');

        if ($($(this))[0].href == String(window.location)) {

            $(this).parent().addClass('active');
            $(this).parent().parent().parent().addClass('active');
            $(this).parent().parent().show();

        }

    });

    /* ---------- Submenu  ---------- */

    $('.dropmenu').click(function(e) {

        e.preventDefault();

        $(this).parent().find('ul').slideToggle();

    });
}

jQuery(document).ready(function($) {
    activeMenu();
});

/* ---------- Main Menu Open/Close ---------- */
jQuery(document).ready(function($) {

    var startFunctions = true;

    $('#main-menu-toggle').click(function() {

        if ($(this).hasClass('open')) {

            $(this).removeClass('open').addClass('close');

            var span = $('#content').attr('class');
            var spanNum = parseInt(span.replace(/^\D+/g, ''));
            var newSpanNum = spanNum + 1;
            var newSpan = 'col-sm-' + newSpanNum;

            $('#content').removeClass('col-sm-' + spanNum);
            $('#content').addClass(newSpan);
            $('#content').addClass('full-radius');
            $('#sidebar-left').hide();

        } else {

            $(this).removeClass('close').addClass('open');

            var span = $('#content').attr('class');
            var spanNum = parseInt(span.replace(/^\D+/g, ''));
            var newSpanNum = spanNum - 1;
            var newSpan = 'col-sm-' + newSpanNum;

            $('#sidebar-left').fadeIn();
            $('#content').removeClass('col-sm-' + spanNum);
            $('#content').removeClass('full-radius');
            $('#content').addClass(newSpan);

        }

    });

});

/* ---------- Widget Area Open/Close ---------- */
jQuery(document).ready(function($) {

    var startFunctions = true;

    $('#widgets-area-button').click(function() {

        if ($(this).hasClass('open')) {

            $(this).removeClass('open').addClass('close');

            var span = $('#content').attr('class');
            var spanNum = parseInt(span.replace(/^\D+/g, ''));
            var newSpanNum = spanNum - 2;
            var newSpan = 'col-sm-' + newSpanNum;

            $('#content').removeClass('col-sm-' + spanNum);
            $('#content').addClass(newSpan);
            $('#widgets-area').fadeIn();

            if (startFunctions) {
                widget_area_functions();
                startFunctions = false;
            }

        } else {

            $(this).removeClass('close').addClass('open');

            var span = $('#content').attr('class');
            var spanNum = parseInt(span.replace(/^\D+/g, ''));
            var newSpanNum = spanNum + 2;
            var newSpan = 'col-sm-' + newSpanNum;

            $('#widgets-area').fadeOut();
            $('#content').removeClass('col-sm-' + spanNum);
            $('#content').addClass(newSpan);

        }

    });

    $('#close-widgets-area').click(function() {

        var span = $('#content').attr('class');
        var spanNum = parseInt(span.replace(/^\D+/g, ''));
        var newSpanNum = spanNum + 2;
        var newSpan = 'col-sm-' + newSpanNum;

        $('#widgets-area').fadeOut();
        $('#content').removeClass('col-sm-' + spanNum);
        $('#content').addClass(newSpan);

        if ($('#widgets-area-button').hasClass('open')) {

            $('#widgets-area-button').removeClass('open').addClass('close');

        } else {

            $('#widgets-area-button').removeClass('close').addClass('open');

        }

    });

});


jQuery(document).ready(function($) {

    /* ---------- ToDo List Action Buttons ---------- */
    if ($(".todo-remove").length) {
        $(".todo-remove").click(function() {

            $(this).parent().parent().fadeTo("slow", 0.00, function() { //fade
                $(this).slideUp("slow", function() { //slide up
                    $(this).remove(); //then remove from the DOM
                });
            });

            return false;
        });

        $(function() {
            $(".todo-remove").parent().parent().parent().sortable();
            $(".todo-remove").parent().parent().parent().disableSelection();
        });
    }

});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToRgba(rgb, alpha) {

    if (jQuery.browser.version <= 8.0) {

        rgb = hexToRgb(rgb);

        rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')';


    } else {

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        rgba = 'rgba(' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ',' + alpha + ')';

    }

    return rgba;

}

$(document).ready(function() {

    widthFunctions();

});

/* ---------- Page width functions ---------- */

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {

    if ($('.timeline')) {

        $('.timeslot').each(function() {

            var timeslotHeight = $(this).find('.task').outerHeight();

            $(this).css('height', timeslotHeight);

        });

    }

    var sidebarLeftHeight = $('#sidebar-left').outerHeight();
    var contentHeight = $('#content').height();
    var contentHeightOuter = $('#content').outerHeight();

    var winHeight = $(window).height();
    var winWidth = $(window).width();

    if (winWidth < 992) {

        if ($('#widgets-area').is(":visible") == true) {

            $('#widgets-area-button').removeClass('close').addClass('open');

            var span = $('#content').attr('class');
            var spanNum = parseInt(span.replace(/^\D+/g, ''));
            var newSpanNum = spanNum + 2;
            var newSpan = 'col-sm-' + newSpanNum;

            $('#widgets-area').hide();
            $('#content').removeClass('col-sm-' + spanNum);
            $('#content').addClass(newSpan);

        }

    }

    if (winWidth > 767) {

        if (sidebarLeftHeight > contentHeight) {

            $('#content').css("min-height", sidebarLeftHeight);

        } else {

            $('#content').css("min-height", "auto");

        }

        $('.dark').css('height', contentHeightOuter);

    } else {

        $('.dark').css('height', 'auto');

    }

}
