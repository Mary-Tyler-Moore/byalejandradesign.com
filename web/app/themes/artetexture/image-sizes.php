<?php

function add_medium_square() {
    add_image_size( 'medium-square', 600, 600, true );
}

add_action( 'after_setup_theme', 'add_medium_square' );

function add_small_square() {
    add_image_size( 'small-square', 350, 350, true );
}

add_action( 'after_setup_theme', 'add_small_square' );

/**
 * Get size information for all currently-registered image sizes.
 * @global $_wp_additional_image_sizes
 * @uses   get_intermediate_image_sizes()
 * @return array $sizes Data for all currently-registered image sizes.
 */
function get_image_sizes() {
	global $_wp_additional_image_sizes;

	$sizes = array();

	foreach ( get_intermediate_image_sizes() as $_size ) {
		if ( in_array( $_size, array('thumbnail', 'medium', 'medium_large', 'large') ) ) {
			$sizes[ $_size ]['width']  = get_option( "{$_size}_size_w" );
			$sizes[ $_size ]['height'] = get_option( "{$_size}_size_h" );
			$sizes[ $_size ]['crop']   = (bool) get_option( "{$_size}_crop" );
		} elseif ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {
			$sizes[ $_size ] = array(
				'width'  => $_wp_additional_image_sizes[ $_size ]['width'],
				'height' => $_wp_additional_image_sizes[ $_size ]['height'],
				'crop'   => $_wp_additional_image_sizes[ $_size ]['crop'],
			);
		}
	}

	return $sizes;
}

/**
 * Adds image sizes at 10% and 200% for each registered size
 */
function add_preview_images() {
  foreach ( get_image_sizes() as $_type => $size) {
    add_image_size( $_type . '-preview',  $size['width'] * 0.1, $size['height'] * 0.1, $size['crop'] );
    add_image_size( $_type . '-retina',  $size['width'] * 2, $size['height'] * 2, $size['crop'] );
  }
}

add_action( 'after_setup_theme', 'add_preview_images' );
