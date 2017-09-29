<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 29 Sept 2017
	@project Azure Site
	@file favorite-hobby.php
	@course Web and Distributed Programming
	@semester Fall, 2017

	NOTE This page only sources the GitHub version, with minor changes
-->

<?php

	$src = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/projects/p-01-favorite-hobby/favorite-hobby-TLL.html");
	$css = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/projects/p-01-favorite-hobby/favorite-hobby-TLL.css");

	$fullStyle = "<style> " . $css . " </style>";
	$fullSrc = str_replace('<link rel = "stylesheet" type = "text/css" href = "./favorite-hobby-TLL.css"></link>',$fullStyle,$src);

	echo $fullSrc;
?>
