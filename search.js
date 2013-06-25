function searchTag($obj) {
	$obj.addClass('search-tag');
	$obj.parents('.collapsed').removeClass('collapsed');
}

function clearSearchTags() {
	$('.search-tag').removeClass('search-tag'); 
}

function search(text) {
	clearSearchTags();
	$('.concord-wrapper').filter(function (index) {
		if ($(this).html().indexOf(text) >= 0) {
			searchTag($(this));
		}
	});
}

function searchDisplay() {
	alert('Display the search dialogue');
}


var html = {
	searchBox: '<div class="input-append"><input class="span2" id="search-terms" type="text"><button class="btn" type="button" onclick="search($(\'#search-terms\').val());"><i class="icon-search"></i></button></div>';
}

// add the search input to the screen
$('#idTabs').prepend(html.searchBox);
