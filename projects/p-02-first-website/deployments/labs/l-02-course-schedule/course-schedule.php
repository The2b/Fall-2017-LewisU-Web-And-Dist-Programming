<!--
	
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 29 Sept 2017
	@project Azure Webpage
	@file course-schedule.php
	@course Web and Distributed Programming
	@semester Fall 2017

	NOTE: This page only sources the GitHub page, with minor changes
-->

<?php
	$src = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/labs/l-02-course-schedule/course-schedule.html");
	echo $src;
?>
