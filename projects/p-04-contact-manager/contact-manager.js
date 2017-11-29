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

var contacts = [];

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
	return contacts;
}

function setContacts(newContacts) {
	contacts = newContacts;
}

/**
 * Loads up the contacts from the JSON file on the server.
 * This will read in once jQuery is loaded; That means that we can use PHP to pull the string
 *
 * @param String json
 */
function readContacts(json) {
	// So, I was having errors testing this on the file level. The fix is to force the MIME type to a JSON
	$.ajaxSetup({
		async:true,
		beforeSend: function(xhr){
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});

	$.getJSON(json, function(data) {
		$.each(data, function(index,value) {
			var entry = new Object();
			entry.name = value.name;
			entry.phoneNum = value.phoneNum; 
			entry.group = value.group;
			entry.email = value.email;
			entry.address = value.address;
			entry.birthday = value.birthday;
			entry.note = value.note;
			contacts[contacts.length] = entry;
		});

		console.log("Populated");
		alert(contacts.length);
	});
}

function initApplet(json) {
	readContacts(json);
	createForm();
	editForm();
	buildTable(contacts);
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
		//return;
	}

	else {
		for(var index = 0; index < contactsArray.length; index++) {
			var row = table.insertRow(index+1);
			var cell = row.insertCell(0);
			console.log("Build table contact name: " + contactsArray[index]["name"]);
			cell.innerHTML = contactsArray[index]["name"];
		}
	}

	// Update form events
	editForm();
	createForm();
}

function regexMatch(regex, contactsArray) {
	var displayedNames = [];

	if(regex == null) {
		sortContacts(contacts);
		buildTable(contacts);
		return;
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

			if(!(contactsArray[index]["phoneNum"] == null)) {
				for(var pnIndex = 0; pnIndex < contactsArray[index]["phoneNum"].length; pnIndex++) {
					if(Array.isArray(contactsArray[index]["phoneNum"][pnIndex].match(regex))) {
						displayedNames.push(contactsArray[index]);
						continue regexTest;
					}
				}
			}


			if(!(contactsArray[index]["group"] == null)) {
				for(var gIndex = 0; gIndex < contactsArray[index]["group"].length; gIndex++) {
					if(Array.isArray(contactsArray[index]["group"][gIndex].match(regex))) {
						displayedNames.push(contactsArray[index]);
						continue regexTest;
					}
				}
			}
	
			if(!(contactsArray[index]["email"] == null)) {
				for(var emIndex = 0; emIndex < contactsArray[index]["email"].length; emIndex++) {
					if(Array.isArray(contactsArray[index]["email"].match(regex))) {
						displayedNames.push(contactsArray[index]);
						continue regexTest;
					}
				}
			}

			if(!(contactsArray[index]["address"] == null)) {
				for(var aIndex = 0; aIndex < contactsArray[index]["address"].length; aIndex++) {
					if(Array.isArray(contactsArray[index]["address"].match(regex))) {
						displayedNames.push(contactsArray[index]);
						continue regexTest;
					}
				}
			}

			if(Array.isArray(contactsArray[index]["birthday"].match(regex))) {
				displayedNames.push(contactsArray[index]);
				continue regexTest;
			}

			if(Array.isArray(contactsArray[index]["note"].match(regex))) {
				displayedNames.push(contactsArray[index]);
				continue regexTest;
			}	
		}
	}

	if(displayedNames.length == 0) {
		buildTable(new Array());
		return;
	}

	buildTable(contacts);

	for(index = 0; index < contacts.length; index++) {
		var indexOfName = displayedNames.indexOf(contacts[index]);
		if(indexOfName == -1) {
			$("#contactList tr").eq(index+1).css("display","none");
		}
	}
}


function attachEvents() {
	$("#searchForm").change(function() {
		regexMatch($("#searchStr").val(),contacts);
	});

	$("#searchForm").submit(function(event) {
		event.preventDefault();
		regexMatch($("#searchStr").val(),contacts);
	});

	$("#help").click(helpPopup());
}

function createContact() {
	var contact = {
		name: $("#cname").val(),
		phoneNums: $("#cphoneNum").val(),
		group: $("#cgroup").val(),
		email: $("#cemail").val(),
		address: $("#caddress").val(),
		birthday: $("#cbday").val(),
		note: $("#cnote").val()
	};

	contacts.push(contact);
	sortContacts(contacts);

	var regex = $("#searchStr").val();
	regexMatch(regex, contacts);
}

function removeContact(index) {
	contacts.splice(index,1);
	sortContacts(contacts);
	var regex = $("#searchStr").val();
	regexMatch(regex, contacts);
}

function editContact(index) {
	var contact = {
		name: $("#ename").val(),
		phoneNum: $("#ephoneNum").val(),
		group: $("#egroup").val(),
		email: $("#eemail").val(),
		address: $("#eaddress").val(),
		birthday: $("#ebday").val(),
		note: $("#enote").val()
	};

	contacts[index] = contact;
	sortContacts(contacts);
	
	var regex = $("#searchStr").val();
	regexMatch(regex, contacts);
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
		height:600,
		width:600,
		modal:true,
		title:"Edit Contact",
		buttons: [
		{
			text: "Save",
			click: function() { editContact($(this).data("index")); $("#editForm").dialog("close"); }
		},
		
		{
			text: "Cancel",
			click: function() { $("#editForm").dialog("close"); }
		},

		{
			text: "Delete",
			click: function() { removeContact($(this).data("index")); $("#editForm").dialog("close"); },
		}],

		close: function() {
			$("#editForm").dialog("close");
		}
	});

	$("#contactList tr :not(:first)").click(function() {
		var index = $(this).parent().index()-1;
		var con = getContacts();
		
		$("#ename").val (con[index]["name"]);

		$("#ephoneNums").val (con[index]["phoneNum"]);

		$("#egroup").val (con[index]["group"]);

		$("#eemail").val (con[index]["email"]);

		$("#eaddress").val (con[index]["address"]);

		$("#ebday").val (con[index]["birthday"]);

		$("#enote").val (con[index]["note"]);

		$("#editForm").data("index",index);
		$("#editForm").dialog("open");
	});

	var form = popup.find("form").on("submit", function(event) {
		event.preventDefault();
		editContact(index);
	});
}

function createForm() {
	var popup = $("#createForm").dialog({
		autoOpen:false,
		height:600,
		width:600,
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
		//var contact = {"name":$("#cname").attr("value"),"phoneNums":$("#cphoneNums").attr("value").split(","),"group":$("#cgroup").attr("value").split(","),"email":$("#cemail").attr("value").split(",")};
		createContact();
	});
}

function helpPopup() {
	alert("Click on any entry to edit or delete it.\n\n" +
		"Clicking on the \"New Contact\" row will allow you to add another entry to the table.\n\n" +
		"You can use the search bar to look through all aspects of your contacts. If any entry has any property which matches the pattern, it will be listed.\n\n" +
		"When the searchbar loses focus, or if the Enter key is pressed while the searchbar has focus, the search will execute.\n\n" +
		"JavaScript regular expressions can be used in the search bar for proper pattern matching.\n\n" + 
		"For help with JavaScript regular expressions, go to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions");
}
