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
		<!-- <title>Web and Distributed Programming Assignment Archive</title> -->
		<title>WaDPAA</title>
	</head>

	<!-- Stops the margins from breaking the top navbar -->
	<body class="bodyStyle">
		<!-- Defines the Navbar -->
		<?php
			include('header.html');
       		?>
		
		<h1 style="font-family:sans-serif">Home</h1>
		<hr />

		<p class="defaultText">
			Welcome to the landing page for Tom Lenz's Web and Distributed Networking class. All the projects will be listed, as will the in-class labs. In addition, the GitHub repository is also included, which can be cloned or navigated through via the web client. The link in the navigation bar can be used for both purposes.
		</p>
	</body>

</html>
