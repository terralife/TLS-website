<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
	'*' => array(
        'tablePrefix' => 'craft',
        'server' => 'localhost',
	),
	
	// Local Development DB settings
	'tls.local' => array(
		'database' => 'tls',
		'user' => 'craft',
		'password' => 'craft',
		'initSQLs' => array("SET SESSION sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';"),
	),

	// Staging Site DB settings
	'terralife.cornerstonedigital.ca' => array(
		'database' => 'rrkmhxrtun',
		'user' => 'rrkmhxrtun',
		'password' => 'hemJ5n5mEq'
	),

	// Production Site DB Settings
	'terralifesciences.com' => array(
		'database' => 'terralifesciences_com',
		'user' => 'terralhB0CkcWKDJ',
		'password' => 'W0397m1GUVAaHju0'
	),

);
