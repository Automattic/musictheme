/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

/* global musicThemeScreenReaderText, musicThemeIcons */
( function( $ ) {

	var body,
		siteMenu       = $( '.main-navigation' ),
		siteHeader     = $( '.site-header' ),
		siteNavigation = siteMenu.find( '.main-navigation > div' ),
		siteWrap       = siteHeader.parents( '.site' );

	/**
	 * Initialize the main navigation
	 */
	function initMainNavigation( container ) {

		// Add parent class to sub-menu parent items
		container.find( '.sub-menu, .children' ).parents( 'li' ).addClass( 'menu-item-has-children' );

		// Add dropdown toggle button
		var dropdownToggle = $( '<button />', {
				'class': 'dropdown-toggle',
				'aria-expanded': false
			} ).append( $( '<span />', {
				'class': 'screen-reader-text',
				text: musicThemeScreenReaderText.expand
			})).append( '<span class="meta-nav" aria-hidden="true">'+ musicThemeIcons.dropdown +'</span>' );

		container.find( '.menu-item-has-children > a' ).after( dropdownToggle );

		// Change menu items with submenus to aria-haspopup="true".
		container.find( '.menu-item-has-children' ).attr( 'aria-haspopup', 'true' );

		// Drop down toggle setup
		container.find( '.dropdown-toggle' ).click( function( e ) {

			var _this            = $( this ),
				otherSubMenus    = _this.parents( '.menu-item-has-children' ).siblings( '.menu-item-has-children' ),
				screenReaderSpan = _this.find( '.screen-reader-text' );

			// Disable default behavior
			e.preventDefault();

			// Stop click outside area function
			e.stopPropagation();

			// Reveal sub-menus
			_this.not( '.menu-toggle' ).toggleClass( 'toggled-on' );
			_this.not( '.menu-toggle' ).parent( 'li' ).toggleClass( 'toggled-on' ).promise().done(function(){

				// Toggle the site wrapper class for mobile menu display
				var _thisLink = $( this );

				if ( _thisLink.hasClass( 'toggled-on' ) ) {
					siteWrap.addClass( 'menu-open' );
				} else {
					siteWrap.removeClass( 'menu-open' );
				}
			});
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

			// Close other sub-menus if they're open
			otherSubMenus.removeClass( 'toggled-on' );
			otherSubMenus.find( '.toggled-on' ).removeClass( 'toggled-on' );

			// jscs:disable
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			// jscs:enable

			// Update screen reader text
			screenReaderSpan.text( screenReaderSpan.text() === musicThemeScreenReaderText.expand ? musicThemeScreenReaderText.collapse : musicThemeScreenReaderText.expand );

		} );

		// Close sub-menus when click outside of menus
		$( 'html' ).click( function() {
			container.find( '.toggled-on' ).removeClass( 'toggled-on' );
		});

		// Close expanded sub-menus when clicking links
		container.find( 'a' ).click( function( e ) {

			var _this         = $( this ),
				anchor        = _this.attr( 'href' ),
				otherSubMenus = container.find( '.toggled-on' );

			//console.log(anchor);
			e.preventDefault();

			otherSubMenus.removeClass( 'toggled-on' ).attr( 'aria-expanded', 'false' ).attr( 'aria-haspopup', 'false' );

			window.location.href = anchor;

		} );
	}

	/**
	 * Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility
	 */
	function addTouchSupport() {

		if ( ! siteNavigation.length || ! siteNavigation.children().length ) {

			return;
		}

		// Toggle `focus` class to allow submenu access on tablets.
		function toggleFocusClassTouchScreen() {

			//	if ( window.innerWidth >= 896 ) {
			$( document.body ).on( 'touchstart.musictheme', function( e ) {

				if ( ! $( e.target ).closest( '.top-navigation li' ).length ) {

					$( '.top-navigation li' ).removeClass( 'focus' );
				}
			} );

			siteNavigation.find( '.menu-item-has-children > a' ).on( 'touchstart.musictheme', function( e ) {

				var el = $( this ).parent( 'li' );

				if ( ! el.hasClass( 'focus' ) ) {

					e.preventDefault();
					el.toggleClass( 'focus' );
					el.siblings( '.focus' ).removeClass( 'focus' );
				}
			} );
		}

		if ( 'ontouchstart' in window ) {

			$( window ).on( 'resize.musictheme', toggleFocusClassTouchScreen );
			toggleFocusClassTouchScreen();
		}

		siteNavigation.find( 'a' ).on( 'focus.musictheme blur.musictheme', function() {

			$( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
		} );
	}

	/**
	 * Add the default ARIA attributes for the menu toggle and the navigations
	 */
	function onResizeARIA() {

		if ( window.innerWidth < 896 ) {

			siteMenu.attr( 'aria-expanded', 'false' );
			siteNavigation.attr( 'aria-expanded', 'false' );

		} else {

			siteMenu.removeAttr( 'aria-expanded' );
			siteNavigation.removeAttr( 'aria-expanded' );
		}
	}

	/**
	 * Add contrast text color to site navigation when a white, grey or black alt-cover image is used
	 */
	function addHeaderContrast() {
		var body = $( document.body );
		var pageCoverImage = $( '.page .hentry .wp-block-cover-image' ).eq(0);

		if ( body.hasClass( 'page-template-color-white' ) || body.hasClass( 'post-template-color-white' ) || pageCoverImage.hasClass( 'white' ) ) {
			siteHeader.addClass( 'white' );
		} else if ( body.hasClass( 'page-template-color-gray' ) || body.hasClass( 'post-template-color-gray' ) || pageCoverImage.hasClass( 'grey' ) || pageCoverImage.hasClass( 'gray' ) ) {
			siteHeader.addClass( 'grey' );
		} else if ( pageCoverImage.hasClass( 'black' ) ) {
			siteHeader.addClass( 'black' );
		}
	}

	/**
	 * Re-initialize the main navigation when it is updated in the customizer
	 * - Borrowed from twentysixteen: https://goo.gl/O6msL1
	 */
	$( document ).on( 'customize-preview-menu-refreshed', function( e, params ) {

		if ( 'menu-1' === params.wpNavMenuArgs.theme_location ) {

			initMainNavigation( params.newContainer );
		}
	});

	/**
	 * Execute functions
	 */
	$( document )
		.ready( initMainNavigation( siteMenu ) )
		.ready( addTouchSupport )
		.ready( addHeaderContrast )
		.ready( function() {

			body = $( document.body );

			$( window )
				.on( 'load.musictheme', onResizeARIA )
				.on( 'resize.musictheme', onResizeARIA );
		});

} )( jQuery );
