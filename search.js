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
