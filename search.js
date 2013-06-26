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

// add the custom styles
var stylesheet = 'https://raw.github.com/AngeloR/fargo-outline-search/master/style.css';
if(document.createStyleSheet) {
	document.createStyleSheet(stylsheet);
}
else {
	$('<link rel="stylesheet" type="text/css" href="' + url + '">').appendTo('head');
}

// add the search input to the screen
$('#idTabs').prepend(html.searchBox);

// bind the keyboard event to access search
$('body').on('keydown', function(e) {
	if(e.which === 83 && e.ctrlKey) {
		$('#search-terms').focus();
	}
});

// bind the keyboard events for the search box
$('#idTabs').on('keydown', '#search-box', function(e) {
	switch(e.which) {
		case 13:
			search($('#search-terms').val());
			$('#search-terms').blur();
			break;
		case 27:
			$('#search-terms').blur().val('');
			clearSearchTags();
			break;
	}
});
