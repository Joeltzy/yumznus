// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= -5) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(300);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(250);   // Else fade out the arrow
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= -5) {        // If page is scrolled more than 50px
        $('#return-to-bot').fadeIn(300);    // Fade in the arrow
    } else {
        $('#return-to-bot').fadeOut(250);   // Else fade out the arrow
    }
});

Template.scrollup.events({
	'click': function() {
	    $('html, body').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 700);

	}
})

Template.scrolldown.events({
    'click': function() {
        $('html, body').animate({
        scrollTop : 10000                    // Scroll to down of body
    }, 1500);

    }
})
