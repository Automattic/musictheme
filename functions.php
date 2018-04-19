<?php
/**
 * Music Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Music Theme
 */

if ( ! function_exists( 'musictheme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function musictheme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on musictheme, use a find and replace
		 * to change 'musictheme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'musictheme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'musictheme' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '_s_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		add_theme_support( 'gutenberg', array(
			'wide-images' => true,
			'colors' => array(
				'#0073aa',
				'#229fd8',
				'#eee',
				'#444',
			),
		) );
	}
endif;
add_action( 'after_setup_theme', 'musictheme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function musictheme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'musictheme_content_width', 740 );
}
add_action( 'after_setup_theme', 'musictheme_content_width', 0 );

/**
 * Register Google Fonts
 */
function musictheme_fonts_url() {
    $fonts_url = '';

    /* Translators: If there are characters in your language that are not
	 * supported by Karla, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$sortsmillgoudy = esc_html_x( 'on', 'Sorts Mill Goudy font: on or off', 'musictheme' );

	if ( 'off' !== $sortsmillgoudy ) {
		$font_families = array();
		$font_families[] = 'Sorts+Mill+Goudy:400,400i';

		$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => 'latin,latin-ext',
		);

		$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}

	return $fonts_url;

}

/**
 * Enqueue scripts and styles.
 */
function musictheme_scripts() {

	/*
	 * Styles
	 */

	// Sorts Mill Goudy font
	wp_enqueue_style( 'musictheme-sorts-mill-goudy', musictheme_fonts_url(), array(), null );

	wp_enqueue_style( 'musictheme-base-style', get_stylesheet_uri() );

	/*
	 * Scripts
	 */

	wp_enqueue_script( 'musictheme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'musictheme-priority-navigation', get_template_directory_uri() . '/js/priority-navigation.js', array( 'jquery' ), '20151215', true );

	wp_enqueue_script( 'musictheme-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	// Screenreader text
	wp_localize_script( 'musictheme-navigation', 'screenReaderText', array(
		'expand'   => esc_html__( 'expand child menu', 'musictheme' ),
		'collapse' => esc_html__( 'collapse child menu', 'musictheme' ),
	) );

}
add_action( 'wp_enqueue_scripts', 'musictheme_scripts' );

/**
 * Check whether the browser supports JavaScript
 */
function musictheme_html_js_class() {
	echo '<script>document.documentElement.className = document.documentElement.className.replace("no-js","js");</script>'. "\n";
}
add_action( 'wp_head', 'musictheme_html_js_class', 1 );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * SVG icons functions and filters.
 */
require get_parent_theme_file_path( '/inc/icon-functions.php' );

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}
