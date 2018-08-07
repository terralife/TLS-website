<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

 // Site declaration
 $localURL = 'http://tls.local';
 $stagingURL = 'http://terralife.cornerstonedigital.ca';
 $productionURL = '';

return array(
	// All environments
	'*' => array(
		'cpTrigger' => 'admin',
		'enableCsrfProtection' => true,
		'defaultWeekStartDay' => 0,
		'omitScriptNameInUrls' => true,
		'usePathInfo' => true,
		'cacheDuration' => false,
		'useEmailAsUsername' => true,
		'generateTransformsBeforePageLoad' => true,
		'allowAutoUpdates' => false,
	),

	// Live environment
	'.com'  => array(
		'devMode' => false,
		'enableTemplateCaching' => true,
		'siteUrl' => $productionURL,
		'environmentVariables' => array(
			'baseUrl'  => $productionURL,
			'staticAssetsVersion' => '1',
		),
	),

	// Staging environment
	'terralife.cornerstonedigital.ca'  => array(
		'devMode' => false,
		'enableTemplateCaching' => true,
		'siteUrl' => $stagingURL,
		'environmentVariables' => array(
			'baseUrl'  => $stagingURL,
			'staticAssetsVersion' => time(),
		),
	),

	// Local environment
	'.local'  => array(
		'devMode' => true,
		'enableTemplateCaching' => false,
		'siteUrl' => $localURL,
		'environmentVariables' => array(
			'baseUrl'  => $localURL,
			'staticAssetsVersion' => time(),
		),
	),
    
);
