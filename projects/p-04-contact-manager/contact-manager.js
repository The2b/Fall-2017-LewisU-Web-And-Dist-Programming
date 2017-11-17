/**
 * @author Thomas Lenz <thomas.lenz96@gmail.com> AS The2b
 * @date 03 November 2017
 * @project Contact Manager
 * @file contact-manager.js
 * @course Web and Dist Programming
 * @semester Fall, 2017
 */

/*
 * Just to be clear, here'll be an example contact entry. Their indexes are anon'ly assigned
 *
 * {
 * 	{ // 0
 * 		"name" : "John Doe",
 * 		"phoneNum" : [
 * 			8888888888,
 * 			9999999999,
 * 			.
 * 			.
 * 			.
 * 		]
 *
 * 		"groups" : [
 * 				.
 * 				.
 * 				.
 * 			],
 *
 * 		"email" : "johnDoe@gmail.com" // May make this an array as well
 * 	}
 *
 * 	{ // 1
 * 	.
 * 	.
 * 	.
 * 	{
 * }
 */

contacts = [];

// So screw JS and not having an at(int) for arrays. Screws me over when I use a function to pull it like normal people
if(!Array.prototype.at) {
	Array.prototype.at = function(index) {
		var val = this[index];
		return val;
	}
}

if(!Array.prototype.push) {
	Array.prototype.push = function(value) {
		this[this.length] = value;
		return;
	}
}

function getContacts() {
	return this.contacts;
}

function setContacts(newContacts) {
	this.contacts = newContacts;
}

/**
 * Loads up the contacts from the JSON file on the server.
 * This will read in once jQuery is loaded; That means that we can use PHP to pull the string
 *
 * @param String json
 * @return Object[] contacts
 */
function readContacts(json) {
	// So, I was having errors testing this on the file level. The fix is to force the MIME type to a JSON
	$.ajaxSetup({
		async:false,
		beforeSend: function(xhr){
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});

	$.getJSON(json, function(data) {
		var jsonData = [];
		$.each(data, function(index,value) {
			var entry = new Object();
			entry.name = value.name;
			entry.phoneNum = value.phoneNum; 
			entry.groups = value.groups;
			entry.email = value.email;
			jsonData.push(entry);
		});

		//sortContacts(jsonData);
		setContacts(jsonData);
		console.log("Populated");
		console.log();
	});
}

function initApplet(json) {
	readContacts(json);
	createForm();
	editForm();
	buildTable(getContacts());
	attachEvents();
}

function buildTable(contactsArray) {

	// Clear out the table, save for element 0 (the New Contact element)
	var table = document.getElementById("contactList");

	while(table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create the New Contact button
	var ncRow = table.insertRow(0);
	var ncCell = ncRow.insertCell(0);
	ncCell.innerHTML = "New Contact";

	// Sort the contacts by first name
	sortContacts(contactsArray);
	
	// And add the new ones
	if(contactsArray.length == 0) {
		return;
	}

	for(var index = 0; index < contactsArray.length; index++) {
		var row = table.insertRow(1);
		var cell = row.insertCell(0);
		cell.id = index;
		console.log("Build table contact name: " + contactsArray[index]["name"]);
		cell.innerHTML = contactsArray[index]["name"];
	}

	// Update form events
	editForm();
	createForm();
}

function regexMatch(regex, contactsArray) {
	var displayedNames = [];

	if(regex == null) {
		displayedNames = getContacts();
	}

	else {
		// Label for correct continuing
		regexTest:
		for(var index = 0; index < contactsArray.length; index++) {
			// Name matching
			if(Array.isArray(contactsArray[index]["name"].match(regex))) {
				displayedNames.push(contactsArray[index]);
				continue regexTest; // No need to keep searching the contact, on to the next one
			}

			for(var pnIndex = 0; pnIndex < contactsArray[index]["phoneNum"].length; pnIndex++) {
				if(Array.isArray(contactsArray[index]["phoneNum"][pnIndex].match(regex))) {
					displayedNames.push(contactsArray[index]);
					continue regexTest;
				}
			}

			for(var gIndex = 0; gIndex < contactsArray[index]["groups"].length; gIndex++) {
				if(Array.isArray(contactsArray[index]["groups"][gIndex].match(regex))) {
					displayedNames.push(contactsArray[index]);
					continue regexTest;
				}
			}
	
			if(Array.isArray(contactsArray[index]["email"].match(regex))) {
				displayedNames.push(contactsArray[index]);
				continue regexTest;
			}
		}
	}

	// @TODO Now, build the table with the displayed indexes
	buildTable(displayedNames);
}


function attachEvents() {
	$("#searchForm").change(function() {
		regexMatch(document.getElementById("searchStr").value,getContacts());
	});
}

function createContact() {
	var contact = {"name": document.getElementById("ename").value, "phoneNums": document.getElementById("ephoneNums").value.split(","), "groups": document.getElementById("egroups").value.split(","), "email": document.getElementById("eemails").value.split(",")};
	
	getContacts().push(contact);
	sortContacts(getContacts());

	buildTable(getContacts());

	return getContacts();
}

function removeContact(contactsArray, index) {
		contactsArray.splice(index,1);
		sortContacts(contactsArray);
		regexMatch(document.getElementById("searchStr").value, contactsArray);
		buildTable(contactsArray);
		return contactsArray;
}

function editContact(contactsArray, index) {
	var contact = {"name": document.getElementById("ename").value, "phoneNum": document.getElementById("ephoneNums").value.split(","), "groups": document.getElementById("egroups").value.split(","), "email": document.getElementById("eemails").value.split(",")};
	contactsArray[index] = contact;
	sortContacts(contactsArray);
	return contactsArray;
}

function sortContacts(contactsArray) {
	contactsArray.sort(function(a,b) { // So this returns what is effectively a cmpstr result based on the names of each entry. That determines the order
		if(a["name"] == b["name"]) {
			return 0;
		}

		else {
			return (a["name"] < b["name"]) ? -1 : 1;
		}
	});
}

function editForm() {
	var popup = $("#editForm").dialog({
		autoOpen:false,
		height:300,
		width:400,
		modal:true,
		title:"Edit Contact",
		buttons: {
			"Save": function() { setContacts(editContact(getContacts(),$(this).data("index"))); $("#editForm").dialog("close"); },
			"Cancel": function() { $("#editForm").dialog("close"); },
			"Delete": function() { setContacts(removeContact(getContacts(),$(this).data("index"))); $("#editForm").dialog("close"); },
		},

		close: function() {
			$("#editForm").dialog("close");
		}
	});

	$("#contactList tr :not(:first)").click(function() {
		var index = $(this).parent().index()-1;
		var con = getContacts();
		$("#ename").val (con[index]["name"]);
		$("#ephoneNums").val (con[index]["phoneNum"].join());
		$("#egroups").val (con[index]["groups"].join());
		$("#eemails").val (con[index]["email"]);

		$("#editForm").data("index",index);
		$("#editForm").dialog("open");
	});

	var form = popup.find("form").on("submit", function(event) {
		event.preventDefault();
		setContacts(editContact(getContacts(),index));
	});
}

function createForm() {
	var popup = $("#createForm").dialog({
		autoOpen:false,
		height:300,
		width:400,
		modal:true,
		title:"New Contact",
		buttons: {
			"Create": function() { createContact(); $("#createForm").dialog("close"); },
			"Cancel": function() { $("#createForm").dialog("close"); },
			// "Delete": delContact,
		},

		close: function() { /*
			form[ 0 ].reset();
			allFields.removeClass( "ui-state-error" );
			*/
			$("#createForm").dialog("close");
		}
	});

	$("#contactList tr :first").click(function() {
		$("#createForm").dialog("open");
	});

	
	var form = popup.find("form").on("submit", function(event) {
		event.preventDefault();
		var contact = {"name":$("cname").value,"phoneNums":$("cphoneNums").value.split(","),"groups":$("cgroups").value.split(","),"email":$("cemails").value.split(",")};
		setContacts(createContact(getContacts(),contact));
	});
}
