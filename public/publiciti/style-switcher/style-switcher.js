$(function(){
	
	$('head').append('<link rel="stylesheet" href="style-switcher/style-switcher.css" type="text/css" />');	
	$('head').append('<script type="text/javascript" src="style-switcher/jquery.cookie.js"></script>');	
		
	//Style container
	var switcher = $('<div class="switcher"><span class="switch-h">Style Switcher <b>Only for demo</b></span><span class="switch"><i class="fa fa-gear"></i></span><h4>Style Switcher</h4><hr><p>Color Styles</p><div class="s-color"><a href="#" data-code="skin-green"><img class="bg-green" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-yellow"><img class="bg-yellow" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-lblue"><img class="bg-lblue" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-red"><img class="bg-red" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-blue"><img class="bg-blue" src="style-switcher/img/trans.png"/></a><br><a href="#" data-code="skin-rose"><img class="bg-rose" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-purple"><img class="bg-purple" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-brown"><img class="bg-brown" src="style-switcher/img/trans.png"/></a><a href="#" data-code="skin-orange"><img class="bg-orange" src="style-switcher/img/trans.png"/></a></div><hr><p>Choose Layout Style</p><select class="s-layout"><option value="#">Select</option><option value="box">Boxed</option><option value="wide">Full Width</option></select><br><hr><p>Pattern for boxed layout</p><div class="s-pattern"><a href="#" data-num="1"><img src="style-switcher/img/p-1.png" /></a><a href="#" data-num="2"><img src="style-switcher/img/p-2.png"/></a><a href="#" data-num="3"><img src="style-switcher/img/p-3.png"/></a><a href="#" data-num="4"><img src="style-switcher/img/p-4.png"/></a><a href="#" data-num="5"><img src="style-switcher/img/p-5.png"/></a></div><hr><p>Images for boxed layout</p><div class="s-back-img"><a href="#" data-img-num="1"><img src="style-switcher/img/img-1.jpg"/></a><a href="#" data-img-num="2"><img src="style-switcher/img/img-2.jpg"/></a><a href="#" data-img-num="3"><img src="style-switcher/img/img-3.jpg"/></a><a href="#" data-img-num="4"><img src="style-switcher/img/img-4.jpg"/></a><a href="#" data-img-num="5"><img src="style-switcher/img/img-5.jpg"/></a></div></div>');
	
	$('body').append(switcher);
			
		// Display after some time 
	$(".switcher .switch-h").delay("1500").fadeIn(3000);
		
	setTimeout(function(){ $('.switcher .switch-h').fadeOut() }, 10000);	
	
	/* Window resize
	$(window).resize(function(){
		var $slidebox=$('.switcher');
		if($(window).width() >= 767){
			$slidebox.animate({left:0},300);
		} else {
			$slidebox.animate({left:-251},300);
		}          
	}); */
	
	// Switcher slide
	/* By Cookie
	if($.cookie('switch')!=null){
		$('.switcher').animate({left:-251},300);		
	} */
	$('.switch').click(function() {
		var $slidebox=$('.switcher');
		// var $s_hide=1;
		if($slidebox.css('left')=="-251px"){
		  $slidebox.animate({left:0},300);
		}
		else{
		  $slidebox.animate({left:-251},300);
		  // $.cookie('switch', $s_hide);
		}
	});    
	
	
	// Color Changer
	// By Cookie
	if($.cookie('braveColor')!=null){
		var color_code = $.cookie('braveColor');
		$('link[id="color_theme"]').attr('href', 'css/styles/'+color_code+'.css');
	}
	// By click
	$('.s-color a').click(function(e){
		e.preventDefault();
		var color_code = $(this).attr('data-code');
		$('link[id="color_theme"]').attr('href', 'css/styles/'+color_code+'.css');
		$.cookie('braveColor', color_code);
	});
	
	
	// Layout Changer
	// Using cookie 
	if($.cookie('braveLayout')!=null){
		var body = $('body');
		if (!(body.hasClass('no-box'))){
			var layout = $.cookie('braveLayout');
			if (layout == 'wide') {
				body.removeClass('boxed');
			}
			else if (layout == 'box'){
				if(!body.hasClass('boxed')){
					body.addClass('boxed');
				}
			}
		}
	}	
	
	// By selecting
	$('.s-layout').change(function(){
		var body = $('body');
		if (!(body.hasClass('no-box'))){
			var layout = $(this).val();
			if (layout == 'wide') {
				body.removeClass('boxed');
				$.cookie('braveLayout', layout);
			}
			else if (layout == 'box'){
				if(!body.hasClass('boxed')){
					body.addClass('boxed');
					$.cookie('braveLayout', layout);
				}
			}
		}
		else{
			alert('You cannot change layout on this page');
		}
	});
	
	// Pattern Changer
	$('.s-pattern a').click(function(e){
		e.preventDefault();
		var body = $('body');
		var pattern_num = $(this).attr('data-num');
		if (body.hasClass('boxed')){
			body.removeClass().addClass('boxed').addClass('pattern-'+pattern_num);
		} else {
			alert('First change layout to Boxed');
		}
	});
	
	// Back Image Changer
	$('.s-back-img a').click(function(e){
		e.preventDefault();
		var body = $('body');
		var img_num = $(this).attr('data-img-num');
		if (body.hasClass('boxed')){
			body.removeClass().addClass('boxed').addClass('img-'+img_num);
		} else {
			alert('First change layout to Boxed');
		}
	});		
	
});