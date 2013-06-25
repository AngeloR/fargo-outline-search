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

// add the search input to the screen
$('.idIconChain').find('.divIcon').eq(1).after('<div class="divIcon"><a href="#" rel="tooltip" data-placement="left" data-original-title="Search" onclick="searchDisplay();"><i class="icon-search"></i></a></div>');
