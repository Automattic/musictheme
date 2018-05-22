/**
 * Priority plus menu pattern.
 *
 * src: https://gist.github.com/sarahmonster/e99db050ffdb14ac4296fc76a23d7e56
 */

( function( $ ) {

	// Priority+ navigation, whee!
	function priorityNav() {

		var mainNav  = $( '#site-navigation' ),
			moreMenu = $( '#more-menu' );

		// Make sure we have a menu and that the more-more item is present
		if ( 0 < mainNav.length && 0 < moreMenu.length ) {
			var navWidth         = 0,
				firstMoreElement = moreMenu.find( 'li' ).first();

			// Calculate the width of our "more" containing element
			var moreWidth = moreMenu.outerWidth( true );

			// Calculate the current width of our navigation
			mainNav.find( '> div > ul > li' ).each( function() {
				navWidth += $( this ).outerWidth( true );
			});

			// Calculate our available space
			var availableSpace = mainNav.outerWidth( true ) - moreWidth;

			// If our nav is wider than our available space, we're going to move items
			if ( navWidth > availableSpace ) {
				var lastItem = mainNav.find( '> div > ul > li:not(#more-menu)' ).last();

				lastItem.attr( 'data-width', lastItem.outerWidth( true ) );
				lastItem.prependTo( moreMenu.find( '.sub-menu, .children' ).eq( 0 ) );
				// Rerun this function!
				setTimeout( priorityNav, 10 );

			// But if we have the extra space, we should add the items back to our menu
			} else if ( navWidth + firstMoreElement.data( 'width' ) < availableSpace ) {
				// Check to be sure there's enough space for our extra element
				firstMoreElement.insertBefore( mainNav.find( '> div > ul > li' ).last() );
				setTimeout( priorityNav, 10 );
			}

			// Hide our more-menu entirely if there's nothing in it
			if ( moreMenu.find( 'ul li' ).length > 0 ) {
				moreMenu.addClass( 'visible' );
			} else {
				moreMenu.removeClass( 'visible' );
			}

		} // check for body class
	} // function priorityNav

	// Debounce
	function debounce(func, wait = 20, immediate = true) {
		var timeout;

		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args);
			}
		};
	}

	// Run our functions once the window has loaded fully
	$( window ).on( 'load', debounce( function() {
		priorityNav();
		setTimeout( function() {
			$( '.js #site-navigation' ).addClass('show-menu');
		}, 200 );
	}));

	// Annnnnd also every time the window resizes
	var isResizing = false;
	$( window ).on( 'resize', function() {
		if (isResizing) {
			return;
		}

		isResizing = true;
		setTimeout( function() {
			priorityNav();
			isResizing = false;
		}, 150 );
	});

} )( jQuery );