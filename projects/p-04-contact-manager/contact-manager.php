<!--
	@author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
	@date 03 November 2017
	@project Contact Manager
	@file contact-manager.html
	@course Web and Dist Programming
	@semester Fall, 2017
-->

<!DOCTYPE html>
<html>
	<head>
		<!-- Load jQuery from Google -->
		<script src="./contact-manager.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="./contact-manager.css" />
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<meta charset="utf-8" />

		<title>Contact Manager</title>
	</head>

	<body onload="initApplet('contacts.json')">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>  
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<!-- Load the header here? -->

		<!-- Help button -->
		<!--<img id="help" src="./help-contents.png" alt="Help" class="help"></img>-->

		<!-- Create the edit/create/delete dialog space -->
		<div id="createForm">
			<fieldset>
			<form>
				<label for="cname">Name</label>
				<input id="cname" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="cphoneNum">Phone Numbers</label>
				<input id="cphoneNum" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="cgroup">Groups</label>
				<input id="cgroup" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="cemail">Email Addresses</label>
				<input id="cemail" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="caddress">Addresses</label>
				<input id="caddress" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="cbday">Birthday</label>
				<input id="cbday" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="cnote">Notes</label>
				<input id="cnote" type="text" class="ui-widget-content ui-corner-all" style="display:block">
			</form>
			</fieldset>
		</div>

		<div id="editForm">
			<form>
				<label for="ename">Name</label>
				<input id="ename" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="ephoneNum">Phone Numbers</label>
				<input id="ephoneNum" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="egroup">Groups</label>
				<input id="egroup" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="eemail">Email Addresses</label>
				<input id="eemail" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="eaddress">Addresses</label>
				<input id="eaddress" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="ebday">Birthday</label>
				<input id="ebday" type="text" class="ui-widget-content ui-corner-all" style="display:block">
				<label for="enote">Notes</label>
				<input id="enote" type="text" class="ui-widget-content ui-corner-all" style="display:block">
			</form>
		</div>

		<form id="searchForm">
			<input type="text" class="searchBar" id="searchStr" placeHolder="Search">
		</form>
			
		<table class="contactList" id="contactList">
			<tr>
				<td id="newContact">New Contact</td>
			</tr>
			<!--
			<tr class="bottom">
				<td>TEMP2</td>
			</tr>
			-->
		</table>
	</body>
</html>
		
