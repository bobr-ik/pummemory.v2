function initRipple( w,h,x,y ) {
	c = ( w <= h ) ? h : w;

	this.width  = c;
	this.height = c;
	this.top    = y - ( this.height * .5 );
	this.left   = x - ( this.width * .5 );
}

function addBubbleClick( s ) {

	$(s).click(function(e) {
		let rippleEl = $('<span class="ripple"></span>').appendTo(this);

		let pos  = $(this).offset();
		let w    = $(s).outerWidth();
		let h    = $(s).outerHeight();

		let posX = e.pageX - pos.left;
		let posY = e.pageY - pos.top;

		let rippleStyle = new initRipple( w,h,posX,posY );

		rippleEl.css( rippleStyle );

	})

	$(s).on('animationend webkitAnimationEnd onanimationend MSAnimationEnd','.ripple', function() {
		$(this).remove();
	})

	return $(s)
}