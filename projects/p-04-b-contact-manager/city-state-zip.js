/**
 * @author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
 * @date 12 October 2017
 * @project Google Maps JS API
 * @file gm-js-game.js
 * @course Web and Dist Programming
 * @semester Fall, 2017
 */

var STARTING_ZOOM = 4;
var DEFAULT_ZOOM = 8;
var ZIP_ZOOM = 10;
var ADDR_ZOOM = 14;
var STATE_ZOOM = 7;
var COUNTY_ZOOM = 9;

var myMap;

if(!window.jQuery) {
	alert("jQuery failed to load; Reload the page, as the page won't owrk as is.");
}

// FFS Why doesn't JS have the simplest array methods...
if(!Array.prototype.countChar) {
	Array.prototype.countChar = function(c) {
		var count = 0;
		for(index = 0; index < this.length; index++) {
			if(this[index] == c) {
				count++;
			}
		}
		return count;
	};
}

function buildMap() {
	myMap = new google.maps.Map(document.getElementById("gMap"), {
		// The following is defined based on the assignment instructions
		center: new google.maps.LatLng(0.0,0.0),
		zoom: STARTING_ZOOM
	});
	
	// Start hybrid view mode
	myMap.setMapTypeId(google.maps.MapTypeId.HYBRID);

	attachEvents();
}

function parseAddress(str) {
	// First, find the number of commas
	// To do this, we use the prototype function above, after turning the str into an array
	var strTrim = str.trim();
	//var strArray = strTrim.split("");
	//var commaCount = strArray.countChar(",");

	/*
	// If it's less than 1, we check the space count
	if(commaCount < 1) {
		var spaceCount = strArray.countChar(" ");
		// If this is equal to one, send it as an address
		if(spaceCount == 1) {
			var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + str + "&components=country:US" + "&key=" + "AIzaSyB1jIuVAEJsvYsGEN8iJJwegU-tPCu6Yfg"
		}
		// If it's 0, do a few things
		if(spaceCount == 0) {
			// If it's all numbers, send it as a zip
		}
	}
	*/

	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + strTrim + "&components=country:US" + "&key=" + "AIzaSyB1jIuVAEJsvYsGEN8iJJwegU-tPCu6Yfg";

	return url;
}

function lookupLocation(url) {
	/*
	var formattedZip = zip;
	if(zip > 99999) { // If it's more than 5 digits
		console.log("Error: Zip not valid");
		return;
	}

	// Pad if it's less than 5 digits
	if(zip < 10000) {
		var zipArr = zip.split("");
		var len = zipArr.length;
		for(index = 0; index < 5-len; index++) {
			formattedZip = "0" + formattedZip;
		}
	}

	// For this, we use the geo-coding API, just passing the ZIP as an address
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formattedZip + "&components=country:US" + "&result_type=locality|administrative_area_level_1" + "&key=" + "AIzaSyB1jIuVAEJsvYsGEN8iJJwegU-tPCu6Yfg"; // My key
	// Either jQuery has been loaded, or the user has been warned to reload the page, so we can use it here freely.
	// Setup AJAX mime type
	$.ajaxSetup({
		async: false,
		beforeSend: function(xhr) {
			if(xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});

	console.log("Test");

	var city;
	var state;
	$.getJSON(url, function(data) {
		var obj = data;
		for(index = 0; index < data.results[0].address_components.length; index++) {
			if(data.results[0].address_components[index]["types"].indexOf("administrative_area_level_1") != -1) {
				state = data.results[0].address_components[index].long_name;
			}
			
			else if(data.results[0].address_components[index]["types"].indexOf("locality") >= 0) {
				city = data.results[0].address_components[index].long_name;
			}
		}
	});

	alert("City: " + city);
	alert("State: " + state);
	*/

	// Either jQuery has been loaded, or the user has been warned to reload the page, so we can use it here freely.
	// Setup AJAX mime type
	$.ajaxSetup({
		async: false,
		beforeSend: function(xhr) {
			if(xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});

	var city;
	var state;
	var zip;

	$.getJSON(url, function(data) {
		var obj = data;
		myMap.panTo(obj.results[0].geometry.location);
		if(obj.results[0].types[0] == "postal_code") {
			myMap.setZoom(ZIP_ZOOM);
		}

		else if(obj.results[0].types[0] == "administrative_area_level_1") {
			myMap.setZoom(STATE_ZOOM);
		}

		else if(obj.results[0].types[0] == "administrative_area_level_2") {
			myMap.setZoom(COUNTY_ZOOM);
		}

		else if(obj.results[0].types[0] == "street_address") {
			myMap.setZoom(ADDR_ZOOM);
		}

		else {
			myMap.setZoom(DEFAULT_ZOOM);
		}
		
		for(index = 0; index < data.results[0].address_components.length; index++) {
			if(data.results[0].address_components[index]["types"].indexOf("administrative_area_level_1") >= 0) {
				state = data.results[0].address_components[index].long_name;
			}
			
			else if(data.results[0].address_components[index]["types"].indexOf("locality") >= 0) {
				city = data.results[0].address_components[index].long_name;
			}
			
			else if(data.results[0].address_components[index]["types"].indexOf("postal_code") >= 0) {
				zip = data.results[0].address_components[index].long_name;
			}
		}
		
		document.getElementById("zip").innerHTML = "ZIP: " + zip;
		document.getElementById("city").innerHTML = "CITY: " + city;
		document.getElementById("state").innerHTML = "STATE: " + state;
	});

}

function attachEvents() {
	$("#searchButton").click(function(event) {
		event.preventDefault();
		var searchVal = $("#searchBar").val();
		lookupLocation(parseAddress(searchVal));
	});

	$("#searchBar").submit(function(event) {
		event.preventDefault();
		var searchVal = this.val();
		lookupLocation(parseAddress(searchVal));
	});
}
