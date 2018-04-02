<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Music Theme
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function musictheme_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of singular to singular pages.
	if ( is_singular() ) {

		$classes[] = 'singular';
	}

	return $classes;
}
add_filter( 'body_class', 'musictheme_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function musictheme_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'musictheme_pingback_header' );

/*
 * Add an extra li to our nav for our priority+ navigation to use
 */
function musictheme_add_ellipses_to_nav( $items, $args ) {
	if ( 'menu-1' === $args->theme_location ) :
		$items .= '<li id="more-menu" class="menu-item menu-item-has-children"><a href="#">';
		$items .= '<button class="dropdown-toggle" aria-expanded="false">';
		$items .= '<span class="screen-reader-text">expand child menu</span>';
		$items .= '<span class="meta-nav" aria-hidden="true">' . musictheme_get_svg( array( 'icon' => 'ellipsis' ) ) . '</span>'; // '...';
		$items .= '</button>';
		$items .= '<span class="screen-reader-text">'. esc_html( 'More', 'musictheme' ) . '</span></a><ul class="sub-menu"></ul></li>';
	endif;
	return $items;
}
add_filter( 'wp_nav_menu_items', 'musictheme_add_ellipses_to_nav', 10, 2 );
