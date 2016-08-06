<?php


function mytheme_preprocess_page(&$vars) {
  // template files called page--contenttype.tpl.php 
  if (isset($vars['node']->type)) {
    $vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
  }
}

function mytheme_theme() {
  return array(
    'masteries_tpl' => array(
      'path' => drupal_get_path('theme', 'mytheme') . '/templates',
      'variables' => array(),
      'template' => 'field-masteries',
    ),
  );
}