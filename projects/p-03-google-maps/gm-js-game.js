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

var myMap;
var locations;
var locationNames;
var locationHints;
var startingPoints; // @TODO hard code starting points
var locationIndex = 0;
var score = 0;

function buildMap() {
	
	defineLocations();

	// Once everything is initialized, create the map
	// Start at (0.0,0.0), then move it. Idk why
	myMap = new google.maps.Map(document.getElementById("gameMap"), {
		// The following is defined based on the assignment instructions
		center: new google.maps.LatLng(0.0,0.0),
		zoom: 1
	});

	// Attach events
	attachListeners();

	// Move the map
	myMap.setCenter(startingPoints[0]);
	myMap.setZoom(4);
}

/**
 * When the map needs to reset, usually because the user got a location, we'll call this function
 * I should probably add a reset button tho @TODO
 */

function resetMap() {
	//myMap.setCenter(startingPoints[locationIndex]); @TODO @DEBUG
	myMap.setCenter(startingPoints[0]);
	myMap.setZoom(4);
}

/**
 * When the user moves the map, we execute this function. It checks the zoom level and, if appropriate, checks if the map contains the location we're looking for.
 * Runs the winner() function (working title) if they're in the correct area, does nothing if not
 *
 * May make this on click instead, since we want to check when it moves OR zoom level changes @TODO
 */

function checkWinConditions() {
	//alert("Event works. Zoom level: " + myMap.getZoom()); // @DEBUG @TODO
	if(myMap.getZoom() < REQUIRED_ZOOM) {
		// @TODO giveHint(); // What hint to give is handled in this function
	}

	else if(myMap.getZoom() >= REQUIRED_ZOOM) {
		if(myMap.getBounds().contains(locations[locationIndex])) {
			alert ("A Winner is you!!");
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
		locationIndex++;
		score++;
		resetMap();
		// @TODO update footer
	}

	else {
		alert("Congratulations!! You win!!"); // Add redirect @TODO
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
		new google.maps.LatLng(0.0,0.0) // @TODO @DEBUG
	];
}

function giveHint() { // @TODO
	if(myMap.getBounds().contains(locations[locationIndex])) {
		// @TODO
		// Give hint, update footer
	}

	else {
		// @TODO
	}
}

function gettingStarted() { // @TODO

}

function attachListeners() { // @TODO
	myMap.addListener('bounds_changed', checkWinConditions);
}

function buildFooter() { // @TODO

}
