<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 28 Sept 2017
	@project Azure Website
	@file index.php
 	@course Web and Distributed Programming
	@semester Fall 2017
-->

<!DOCTYPE=html>
<html>
	<head>
		<!-- Source CSS -->
		<link rel="stylesheet" type="text/css" href="./azure-website.css"></link>
		<meta charset="utf-8" />
		
		<title>WaDPAA</title>

		<!-- Because fuck Ajit -->
		<script src="https://widget.battleforthenet.com/widget.js" async></script>
	</head>

	<!-- Stops the margins from breaking the top navbar -->
	<body class="bodyStyle">
		<!-- Defines the Navbar -->
		<?php
			include("https://raw.githubusercontent.com/The2b/Fall-2017-LewisU-Web-And-Dist-Programming/master/projects/p-02-first-website/header.html");
       		?>
		
		<h1 style="font-family:sans-serif">Home</h1>
		<hr />

		<p class="defaultText">
			Welcome to the landing page for Tom Lenz's Web and Distributed Networking class. All the projects will be listed, as will the in-class labs. In addition, the GitHub repository is also included, which can be cloned or navigated through via the web client. The link in the navigation bar can be used for both purposes.<br /><br />
			The banner links will take you to a page where each project or lab is listed, along with its respective GitHub folder and a direct link to a ZIP file for downloading.<br /><br />

			The dropdown links will send you to a page implementing each respective project or lab. These links will open a new tab.
		</p>
	</body>

</html>
