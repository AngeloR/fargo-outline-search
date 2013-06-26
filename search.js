function searchTag($obj) {
	$obj.addClass('search-tag');
	$obj.parents('.collapsed').removeClass('collapsed');
}

function clearSearchTags() {
	$('.search-tag').removeClass('search-tag'); 
}

function search(text) {
	clearSearchTags();
	if(text.trim().length > 0) {
		$('.concord-wrapper').filter(function (index) {
			if ($(this).html().toLowerCase().indexOf(text.toLowerCase()) >= 0) {
				searchTag($(this));
			}
		});
	}
}

var html = {
	searchBox: '<div id="search-box" class="row"><div class="input-append offset5 span7"><input class="span6" id="search-terms" placeholder="Search..." type="text"><button class="btn" type="button" onclick="search($(\'#search-terms\').val());"><i class="icon-search"></i></button></div></div>'
}

// add the search input to the screen
$('#idTabs').prepend(html.searchBox);

// bind the keyboard events
$('#idTabs').on('keydown', '#search-box', function(e) {
	switch(e.which) {
		case 13:
			search($('#search-terms').val());
			break;
		case 27:
			$('#search-terms').blur().val('');
			clearSearchTags();
			break;
	}
});
