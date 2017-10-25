/**
 * @author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
 * @date 12 October 2017
 * @project Google Maps JS API
 * @file gm-js-game.js
 * @course Web and Dist Programming
 * @semester Fall, 2017
 */

var NUM_LOCATIONS = 8;
var REQUIRED_ZOOM = 8;
var DEFAULT_ZOOM = 5;
var MARKER_ZOOM = 16;

// Just so I don't forget what they are
var FIVE_HUNDRED_MILES = 804672;
var TWO_FIFTY_MILES = 402336;
var ONE_HUNDRED_MILES = 160934;
var FIFTY_MILES = 80467;

var myMap;
var locations;
var locationNames;
var locationHints;
var startingPoints; // @TODO hard code starting points
var markers;
var locationIndex = 0;
var score = 0;
var isLoaded = 0;

function buildMap() {
	
	defineLocations();

	// Once everything is initialized, create the map
	// Start at (0.0,0.0), then move it. Idk why
	myMap = new google.maps.Map(document.getElementById("gameMap"), {
		// The following is defined based on the assignment instructions
		center: new google.maps.LatLng(0.0,0.0),
		zoom: 1
	});

	myMap.addListener('idle',startupScreen);

	// Move the map
	myMap.setCenter(startingPoints[0]);
	myMap.setZoom(DEFAULT_ZOOM);
	
	// Start hybrid view mode
	myMap.setMapTypeId(google.maps.MapTypeId.HYBRID);

	// Attach events
	attachListeners();

	// Show hints
	document.getElementById("hint").visibility = "visible";
}

/**
 * When the map needs to reset, usually because the user got a location, we'll call this function
 */
function resetMap() {
	myMap.setCenter(startingPoints[locationIndex]);
	myMap.setZoom(DEFAULT_ZOOM);
}

/**
 * When the user moves the map, we execute this function. It checks the zoom level and, if appropriate, checks if the map contains the location we're looking for.
 * Runs the winner() function (working title) if they're in the correct area, does nothing if not
 */

function checkWinConditions() {
	if(myMap.getZoom() < REQUIRED_ZOOM) {
		giveHint(); // What hint to give is handled in this function
	}

	else if(myMap.getZoom() >= REQUIRED_ZOOM) {
		if(myMap.getBounds().contains(locations[locationIndex])) {
			win();
		}
	}

	else {
		console.log("Error: Zoom level is not a number");
		alert("WTF did you do?! Zoom level is not a number");
	}
}

function win() {
	if(locationIndex < NUM_LOCATIONS-1) {
		alert("You found location number " + (locationIndex+1) + ", " + locationNames[locationIndex]);

		markers[locationIndex].setMap(myMap);
		
		myMap.setCenter(markers[locationIndex].getPosition());
		myMap.setZoom(MARKER_ZOOM);
		
		locationIndex++;
		score++;
		
		document.getElementById("score").innerHTML = ("Score: " + score);
	}

	else {
		alert("Congratulations!! You win!!"); // Add redirect @TODO
		aWinnerIsYou();
	}
}

function defineLocations() {
	
	locations = [
		new google.maps.LatLng(41.8788764,-87.6359149),
		new google.maps.LatLng(34.011508,-118.4922125),
		new google.maps.LatLng(40.751006,-73.9773437),
		new google.maps.LatLng(36.11787,-115.173037),
		new google.maps.LatLng(35.0109906,-115.4733551),
		new google.maps.LatLng(35.2674841,-86.3919609),
		new google.maps.LatLng(28.385233,-81.563874),
		new google.maps.LatLng(42.3466764,-71.0972178)
	];

	locationNames = [
		"The Sears Tower",
		"The Santa Monica Pier",
		"Grand Central Station",
		"Caesars Palace",
		"The Mojave Desert",
		"Lynchburg TN",
		"Walt Disney World Resort",
		"Fenway Park"
	];
	
	locationHints = [
		"One of the largest buildings in the US. The antennas aren't just for show (they are)",
		"o Yacht Harbor o Sport Fishing o Boating o Cafes",
		"All aboard!! CHOO CHOO!!",
		"Et tu, Brute?",
		"Where The Courier roams",
		"The city with a single traffic light! For a dry county, there's sure a lot of booze here...",
		"Where dreams come true! Right after the Superbowl, that is",
		"The Great Green Jewel of the Commonwealth"
	];
	
	startingPoints = [
		new google.maps.LatLng(40.979898,-97.207031), // @TODO Maybe change this. It's about middle America atm. Prob fine for #1
		new google.maps.LatLng(39.1733632,-111.4039589),
		new google.maps.LatLng(39.0028165,-75.6324745),
		new google.maps.LatLng(40.9971699,-103.5157753),
		new google.maps.LatLng(38.9088401,-109.0528847),
		new google.maps.LatLng(38.8061784,-85.2784706),
		new google.maps.LatLng(34.6520328,-86.7726112),
		new google.maps.LatLng(40.4977834,-81.1036659)
	];

	markers = [
		new google.maps.Marker({
			position: locations[0],
			title: locationNames[0],
			label: "1"
		}),
		
		new google.maps.Marker({
			position: locations[1],
			title: locationNames[1],
			label: "2"
		}),
		
		new google.maps.Marker({
			position: locations[2],
			title: locationNames[2],
			label: "3"
		}),
		
		new google.maps.Marker({
			position: locations[3],
			title: locationNames[3],
			label: "4"
		}),
		
		new google.maps.Marker({
			position: locations[4],
			title: locationNames[4],
			label: "5"
		}),
		
		new google.maps.Marker({
			position: locations[5],
			title: locationNames[5],
			label: "6"
		}),
		
		new google.maps.Marker({
			position: locations[6],
			title: locationNames[6],
			label: "7"
		}),
		
		new google.maps.Marker({
			position: locations[7],
			title: locationNames[7],
			label: "8"
		})
	];
}

function giveHint() {
	document.getElementById("hint").innerHTML = hintFooter();
	document.getElementById("hint").style.visibility = "visible";
}

function hintPopup() {
	alert(locationHints[locationIndex] + "\nZoom level: " + myMap.getZoom());
}

function hintFooter() {
	var distance = google.maps.geometry.spherical.computeDistanceBetween(myMap.getCenter(),locations[locationIndex]);
	var hint = "";
	if(distance < FIFTY_MILES && myMap.getZoom() >= 7) {
		hint = "White Hot!";
		return hint;
	}
	
	else if(distance < ONE_HUNDRED_MILES && myMap.getZoom() >= 6) {
		hint = "Warm";
		return hint;
	}

	else if(distance < TWO_FIFTY_MILES && myMap.getZoom() >= 5) {
		hint = "Cold";
		return hint;
	}

	else if(distance < FIVE_HUNDRED_MILES && myMap.getZoom() >= 4) {
		hint = "May as well be in Antarctica";
		return hint;
	}

	else if(distance > FIVE_HUNDRED_MILES) {
		hint = "Absolute zero";
		return hint;
	}

	else {
		hint = "Something's wrong. Distance is NULL.";
		return hint;
	}
}

function attachListeners() {
	myMap.addListener('bounds_changed', checkWinConditions);
	myMap.addListener('bounds_changed', hintFooter);
	document.getElementById("gettingStarted").addEventListener("click",displayHelp);
	document.getElementById("hint").addEventListener("click",hintPopup);
	document.getElementById("score").addEventListener("click",resetMap);

	// This is the simplest way I could do it without passing vars through like the instructor said not to do in class
	for(var index = 0;index < NUM_LOCATIONS; index++) {
		markers[index].setClickable(true);
		let subIndex = index;
		markers[index].addListener("dblclick", function() { 
			var index = subIndex;
			myMap.setCenter(markers[index].getPosition());
			myMap.setZoom(MARKER_ZOOM);
		});
	}
}

function displayHelp() {
	alert(
		"This is a game using Google Maps to find location through the hot and cold meter, along with specific hints\n\n" +
		"The goal is to find all 8 locations in the game. The game ends after all 8 locations are found.\n\n" +
		"A location can only be found at a minimum zoom level of 8. The game starts off at zoom level 5.\n\n" +
		"The current zoom level can be found with the specific hint.\n\n" +
		"The hot/cold indicatior is limited by zoom level. Each zoom level past the starting level (4-7) becomes more specific.\n\n" + //@TODO
		"Once the location is in the map while the zoom level is at least 8, a marker is plcaed.\n\n" +
		"Once you have the marker, the location can be focused by double clicking the marker.\n\n" +
		"The score is displayed in the bottom left corner. When you find all 8, you win!\n\n" +
		"To re-center the map on the starting point of your current goal, click the score"
	);
}

function aWinnerIsYou() {
	// So for this, we'll hide the 2 top displays (map and start screen), and show the gameOver screen.
	document.getElementById("gameMap").style.visibility = "hidden"; // @TODO may want to switch to display:none
	document.getElementById("startScreen").style.visibility = "hidden";
	document.getElementById("gameOver").style.visibility = "visible";
}

function startGame() {
	if(isLoaded) {
		// Hide the visibility of start and end screens, show map screen
		document.getElementById("startScreen").style.visibility = "hidden";
		document.getElementById("gameOver").style.visibility = "hidden";
		document.getElementById("gameMap").style.visibility = "visible";
	}
}

function resetGame() {
	// Hide the visibility of end and map screen, show start screen
	document.getElementById("gameOver").style.visibility = "hidden";
	document.getElementById("gameMap").style.visibility = "hidden";
	document.getElementById("startScreen").style.visibility = "visible";

	// Reset vars
	locationIndex = 0;
	score = 0;

	// Remove markers
	for(index = 0; index < NUM_LOCATIONS; index++) {
		markers[index].setMap(null);
	}

	// Reset map
	resetMap();
}

function startupScreen() {
	isLoaded = 1;
	document.getElementById("loadingString").innerHTML = "Click anywhere to begin";
	google.maps.event.clearListeners(myMap,'idle'); // No need to listen to this anymore
}
