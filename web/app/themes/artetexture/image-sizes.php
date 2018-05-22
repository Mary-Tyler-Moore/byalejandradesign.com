<?php

function add_medium_square() {
    add_image_size( 'medium-square', 600, 600, true );
}

add_action( 'after_setup_theme', 'add_medium_square' );

function add_small_square() {
    add_image_size( 'small-square', 350, 350, true );
}

add_action( 'after_setup_theme', 'add_small_square' );

?>