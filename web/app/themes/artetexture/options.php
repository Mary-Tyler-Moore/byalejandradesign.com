<?php

if( function_exists('acf_add_options_page') ) {

  acf_add_options_page(array(
    'page_title' 	=> 'General Settings',
    'menu_title'	=> 'General Settings',
    'menu_slug' 	=> 'general-settings',
    'capability'	=> 'edit_posts',
    'redirect'		=> false
	));

	acf_add_options_sub_page(array(
    'page_title' 	=> 'Header Settings',
    'menu_title'	=> 'Header',
    'parent_slug'	=> 'general-settings',
  ));

  acf_add_options_sub_page(array(
    'page_title' 	=> 'Footer Settings',
    'menu_title'	=> 'Footer',
    'parent_slug'	=> 'general-settings',
  ));

}
?>
