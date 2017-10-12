<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 12 October 2017
	@project HTML & JavaScript Interaction
	@file html-js.php
	@course Web and Dist Programming
	@semester Fall, 2017
-->

<?php
$rawHtml=file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/labs/l-05-javascript-html-interaction/html-js.html");

$oldScriptLine="<script type=\"text/javascript\" src=\"html-js.js\"></script>";
$newScriptLine="<script type=\"text/javascript\" src=\"html-js-js.php\" async></script>";

$changes=str_replace($oldScriptLine,$newScriptLine,$rawHtml);

echo ($changes);
?>
