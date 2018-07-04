<?php
/**
 * For more information on this highly specific error
 * https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress#graphql-error---unknown-field-on-acf
 */

if (!function_exists('acf_nullify_empty')) {
   /**
    * Return `null` if an empty value is returned from ACF.
    *
    * @param mixed $value
    * @param mixed $post_id
    * @param array $field
    *
    * @return mixed
    */
   function acf_nullify_empty($value, $post_id, $field) {
       if (empty($value)) {
           return null;
       }
       return $value;
   }
}

// target all acf fields
add_filter('acf/format_value', 'acf_nullify_empty', 100, 3);

?>
