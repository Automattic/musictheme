<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Music Theme
 */

get_header(); ?>

	<main id="primary" class="site-main">

	<?php
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/content-single', get_post_type() );

		the_post_navigation( array(
			'prev_text' => musictheme_get_svg( array( 'icon' => 'previous' ) ) . ' %title',
			'next_text' => '%title ' . musictheme_get_svg( array( 'icon' => 'next' ) ),
		) );

		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;

	endwhile; // End of the loop.
	?>

	</main><!-- #primary -->

<?php
get_footer();
