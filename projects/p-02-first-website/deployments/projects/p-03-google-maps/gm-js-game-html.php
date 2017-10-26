<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 25 October 2017
	@project Google Maps JS API
	@file gm-js-game-html.php
	@course Web and Distributed Programming
	@semester Fall, 2017
-->

<?php
$css = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/projects/p-03-google-maps/gm-js-game.css");
$html = file_get_contents("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/projects/p-03-google-maps/gm-js-game.html");

$fullStyle = "<style> " . $css . " </style>";
$styledHtml = str_replace("<link rel=\"stylesheet\" type=\"text/css\" href=\"./gm-js-game.css\"></link>",$fullStyle,$html);

$fullHtml = str_replace("gm-js-game.js","gm-js-game-js.php",$styledHtml);

echo $fullHtml
?>
