<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 29 Sept 2017
	@project Azure Webpage
	@file course-schedule-css.php
	@course Web and Distributed Programming
	@semester Fall 2017

	NOTE: This page only sources the GitHub page, with minor changes
-->

<?php
$src = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/labs/l-03-course-schedule-css/course-schedule.html");
$css = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/labs/l-03-course-schedule-css/course-schedule.css");
$fullStyle = "<style> " . $css . " </style>";

$fullSrc = str_replace('<link rel = "stylesheet" type="text/css" href="./course-schedule.css"></link>',$fullStyle,$src);

echo $fullSrc;
?>
