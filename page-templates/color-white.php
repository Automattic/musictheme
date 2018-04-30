<?php
/**
 * Template Name: White Page Header
 * Template Post Type: post, page
 *
 * @package Music Theme
 */

// This template is all handled by CSS, so we're just
// replicating the single.php or page.php templates here.
if ( is_single() ) {
	get_template_part( 'single' );
} else if ( is_page() ) {
	get_template_part( 'page' );
}