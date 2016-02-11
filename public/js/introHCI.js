'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
    var newString = "/project/" + idNumber;
    $.get(newString, projectCallback);

	console.log("User clicked on project " + idNumber);
}

/* callback when project button is clicked*/
function projectCallback(result) {
    console.log(result);
    var searchString = "#project"+result['id'];
    var jObject = $(searchString).find(".details");
    var projectHTML = '<img src="' +result['image']+ '"class="detailsImage">'+
        '<h6>'+result['title']+'</h6><h6>' + result['date']+
        '</h6>'+result['summary'];
    jObject.html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
    //e.preventDefault();
	console.log("User clicked on color button");
    $.get("/palette", colorCallback);
}
function colorCallback(result){
    debugger;
    var colors = result['colors']['hex'];
    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);

    console.log("Color changes should be happening!");
}
