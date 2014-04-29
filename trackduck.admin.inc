<?php

function trackduck_configuration_form() {

  $form['#attached']['js'][] = array(
    'data' => drupal_get_path('module', 'trackduck') . '/js/trackduck_init.js',
  );

  $form['#attached']['css'][] = array(
    'data' => drupal_get_path('module', 'trackduck') . '/css/trackduck.css',
  );

  $form['#attached']['js'][] = array(
    'data' => array('trackduckSettings' => array('projectUrl' => $GLOBALS['base_url'])),
    'type' => 'setting',
  );

  $form['main'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'main-container',
      ),
    ),
  );

  $form['main']['description'] = array(
    '#prefix' => '<h2>Main Settings</h2>',
    '#markup' => t('TrackDuck - visual feedback and bug tracking solution for web. After enabling TrackDuck plugin, you will be able to add comments with screenshots directly from your Drupal website, and receive detailed feedback from your customers. You can also receive error reports from users. Take control of feedback and communication with clients, sign up for track duck for free. Learn more on <a href="http://trackuck.com" title="Visit TrackDuck" target="_blank">TrackDuck website</a>.'),
  );

  $form['login'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'element-hidden',
      ),
      'id' => 'td-login-container',
    ),
  );

  $form['login']['buttons'] = array(
    '#markup' => '<p><a href="https://app.trackduck.com/auth/google?redirect=' . $GLOBALS['base_url'] . '/' . current_path() . '" id="trackduck-google">' . t('Google signup') . '</a>
      <a href="https://app.trackduck.com/auth/Facebook?redirect=' . $GLOBALS['base_url'] . '/' . current_path() . '" id="trackduck-facebook">' . t('Login with Facebook') . '</a></p><p>
      <a href="https://app.trackduck.com/auth/login?redirect=' . $GLOBALS['base_url'] . '/' . current_path() . '">' . t('Login or register with email') . '</a></p>',
  );

  $form['enable'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'element-hidden',
      ),
      'id' => 'td-enable-container',
    ),
  );

  $form['enable']['buttons'] = array(
    '#markup' => '<p><a href="https://app.trackduck.com/#/project/new/step1?url=' . $GLOBALS['base_url'] . '" target="_blank" id="trackduck-enable">' . t('Enable integration') . '</a></p>',
  );

  $form['disable'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'element-hidden',
      ),
      'id' => 'td-disable-container',
    ),
  );

  $form['disable']['buttons'] = array(
    '#markup' => '<a href="#" id="trackduck-disable">' . t('Disable integration') . '</a>
      <a href="https://app.trackduck.com/#/project/' . variable_get('trackduck_id', false) . '/settings" id="trackduck-options" target="_blank">' . t('Open project settings') . '</a>',
    '#prefix' => '<div class="buttons">',
    '#suffix' => '</div>',
  );

  $form['disable']['extensions'] = array(
    '#markup' => '<h3>' . t('Improve TrackDuck performance') .'</h3><p>' . t('Install extension for your favourite browser and to enhance screenshot capturing') . '</p>
      <p><a href="https://chrome.google.com/webstore/detail/trackduck/ekhfapehhkdanmgjkgagafnilhomfkek" id="trackduck-chrome" target="_blank">
      <img src="/' . drupal_get_path('module', 'trackduck') . '/images/chrome.png" alt=""><span>Google Chrome</span></a>
      <a href="https://trackduck.com/en/extensions/firefox/" id="trackduck-firefox" target="_blank">
      <img src="/' . drupal_get_path('module', 'trackduck') . '/images/ff.png" alt=""><span>Mozilla Firefox</span></a>',
    '#prefix' => '<div class="extensions">',
    '#suffix' => '</div>',
  );

  $form['trackduck_active'] = array(
    '#type' => 'hidden',
    '#default_value' => variable_get('trackduck_active'),
    '#attributes' => array(
      'id' => 'trackduck_active'
    ),
  );

  $form['trackduck_id'] = array(
    '#type' => 'hidden',
    '#default_value' => variable_get('trackduck_id'),
    '#attributes' => array(
      'id' => 'trackduck_id'
    ),
  );
  return system_settings_form( $form );
}