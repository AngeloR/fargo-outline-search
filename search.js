var FargoOutlineSearch = {
	html: {
		searchBox: '<div id="search-box" class="row"><div class="input-append offset5 span7"><input class="span6" id="search-terms" placeholder="Search..." type="text"><button class="btn" type="button" onclick="search($(\'#search-terms\').val());"><i class="icon-search"></i></button></div></div>',
		badge: '<span class="badge search-tab-counter badge-info">{badgecount}</span>'
	},
	css: {
		'.search-tag': [
			'background-color: #ffff22'
		],
		'#search-box': [
			'text-align: right',
			'position: relative'
		],
		'#idTabsList li a > span': [
			'position: relative'
		],
		'.search-tab-counter': [
			'position: absolute',
			'bottom: 15px'
		],
		'#search-results': [
			'position: absolute',
			'right: 0',
			'top: 30px',
			'width: 400px',
			'max-height: 400px',
			'overflow: auto',
			'z-index: 99'
		],
		'.search-result-item': [
			'font-size: 14px',
			'text-align: left',
			'padding: 6px 10px',
			'color: #555',
			'background-color: #f9f9f9'
		],
		'.search-result-item:hover': [
			'background-color: #fff',
			'color: #333'
		],
		'.search-result-item-title': [
			'font-weight: bold',
			'display: block'
		],
		'.search-result-item-body': [
			'display: block'
		]
	},
	highlightTab: function(i, v) {
		var $v = $(v),
			$el = $('a[href=#' + $v.attr('id') + '] > span');

		if($el.find('.search-tab-counter').length > 0) {
			$el.find('.search-tab-counter').html($v.find('.search-tag').length);
		}
		else {
			$el.append(FargoOutlineSearch.html.badge.replace('{badgecount}', $v.find('.search-tag').length));
		}
	},
	searchTag: function($obj) {
		$obj.addClass('search-tag');
		$obj.parents('.collapsed').removeClass('collapsed');
		$('.search-tag').closest('.tab-pane').each(FargoOutlineSearch.highlightTab);

	},
	clearSearchTags: function() {
		$('.search-tag').removeClass('search-tag'); 
		$('.search-tab-counter').remove();
	},
	search: function(text) {
		FargoOutlineSearch.clearSearchTags();
		if(text.trim().length > 0) {
			$('.concord-wrapper').filter(function (index) { 
				if ($(this).html().toLowerCase().indexOf(text.toLowerCase()) >= 0) {
					FargoOutlineSearch.searchTag($(this));
				}
			});
		}
	},
	searchListEntry: function(text, tab) {
		var li = '<li class="search-result-item">';
		li += '<span class="search-result-item-title">' + tab + '</span>';
		li += '<span class="search-result-item-body">' + text + '</span>';
		li += '</li>';
	},
	buildCss: function() {
		var cssSelectors = Object.keys(FargoOutlineSearch.css), cssStr = '';	
		for(var i = 0, l = cssSelectors.length; i < l; ++i) {
			cssStr += cssSelectors[i] + '{' + FargoOutlineSearch.css[cssSelectors[i]].join(";\r\n") + '}';
		}

		$('head').append('<style>' + cssStr + '</style>');
	},
	init: function() {
		FargoOutlineSearch.buildCss();

		// add the search input to the screen
		$('#idTabs').prepend(FargoOutlineSearch.html.searchBox);

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
					FargoOutlineSearch.search($('#search-terms').val());
					$('#search-terms').blur();
					break;
				case 27:
					$('#search-terms').blur().val('');
					FargoOutlineSearch.clearSearchTags();
					break;
			}
		});

	}
};

FargoOutlineSearch.init();
