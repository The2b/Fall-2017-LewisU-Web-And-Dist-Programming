/**
 * @author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
 * @date 04 Oct 2017
 * @project HTML & JavaScript Interaction
 * @file html-js.js
 * @course Web and Dist Programming
 * @semester Fall, 2017
 */

// Define vars
function load() {
	imageArray = [];
	currentImage = 0;
}

/**
 * Event for the submit button
 * Reads the text of the Source URL bar, validates it, and either appends it to the image array or rejects it.
 */
function clickSubmit() {
	var url = document.getElementById("imageURL").value;
	
	// Verify URL by the following rules: begins in http, ends in jpg or gif
	// Regex: ^[Hh][Tt]{2}[Pp].+\.$((jpg)|(gif)])
	// I later extended it to be a bit more specific and accepting
	var pattern = /^[Hh][Tt]{2}[Pp][Ss]?.+\.(?:(?:[Gg][Ii][Ff])|(?:[Jj][Pp][Ee]?[Gg])|(?:[Pp][Nn][Gg])|(?:[Tt][Ii][Ff]{2})|(?:[Jj][Ff][Ii]?[Ff])|(?:[Jj][Pp][2Xx])|(?:[Jj]2[KkCc]))$/g;
	var goodUrl = pattern.test(url);
	
	if(goodUrl) {
		imageArray.push(url);
		document.getElementById("theImage").src = imageArray[imageArray.length - 1];
	}

	else if (!goodUrl) {
		alert("URL is not valid. Valid addresses are as follows, lacking case-sensitivity \"HTTP://*.xxx\", where XXX is a valid format. Valid formats are as follows: gif, jpg, jpeg, png, tiff, jfif, jff, jp2, jpx, j2k, or j2c. Only the strongest verification for us!!");
	}

	else {
		alert("URL given is neither good or bad. I'd say let someone know, but do we really care? But let's be real, you're probably just screwing with things, aren't you? ... That's what I thought.");
	}
}

/**
 * Event for the Next Image button
 * Reads the currentImage var, executes a modulo op on it with the array size as theh modulus. This wraps currentImage if needed. No need to worry about a cap since it'll hotswitch to Number if needed
 *
 * Then, the "theImage" object's src attribute is set to the proper URL
 */
function clickNext() {
	// Handles exception in case array is empty
	if(!imageArray.length) {
		alert("No images to display");
		return;
	}

	currentImage++;
	var index = currentImage % imageArray.length;
	document.getElementById("theImage").src = imageArray[index];
}
