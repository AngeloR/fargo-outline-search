var FargoOutlineSearch = {
	html: {
		searchBox: '<div id="search-box" class="row"><div class="input-append offset5 span7"><input class="span6" id="search-terms" placeholder="Search..." type="text"><button class="btn" type="button" onclick="search($(\'#search-terms\').val());"><i class="icon-search"></i></button></div><ul id="search-results"></ul></div>',
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
			'z-index: 99',
			'box-shadow: 0 1px 2px rgba(0,0,0,0.3)'
		],
		'.search-result-item': [
			'font-size: 14px',
			'text-align: left',
			'padding: 6px 10px',
			'color: #555',
			'background-color: #fff',
			'cursor: pointer'
		],
		'.search-result-item:nth-child(odd)': [
			'background-color: #f9f9f9'
		],
		'.search-result-item:hover': [
			'background-color: #08c',
			'color: #fff'
		],
		'.search-result-item:hover .search-result-item-title, .search-result-item:hover .search-result-item-body': [
			'color: #fff'
		],
		'.search-result-item-title': [
			'font-weight: bold',
			'display: block',
			'margin-bottom: 2px'
		],
		'.search-result-item-body': [
			'display: block',
			'color: #777',
			'line-height: 18px'
		]
	},
	highlightTab: function(i, v) {
		var $v = $(v),
			$el = $('a[href=#' + $v.attr('id') + ']');

		if($el.find('.search-tab-counter').length > 0) {
			$el.find('.search-tab-counter').html($v.find('.search-tag').length);
		}
		else {
			// add the badge
			$el.append(FargoOutlineSearch.html.badge.replace('{badgecount}', $v.find('.search-tag').length));
		}
		// for each tab display the results in the little result displayer window thinger
		var res = '';
		$v.find('.search-tag').each(function(i, v) {
			var li = FargoOutlineSearch.searchListEntry($(this).text(), $el.text().replace(/\d(.?)/,''));
			res += li;
		});

		$('#search-results').append(res);
	},
	searchTag: function($obj) {
		$obj.addClass('search-tag');
		$obj.parents('.collapsed').removeClass('collapsed');

	},
	clearSearchTags: function() {
		$('.search-tag').removeClass('search-tag'); 
		$('.search-tab-counter').remove();
		$('#search-results').html('');
	},
	search: function(text) {
		FargoOutlineSearch.clearSearchTags();
		text = text.trim();
		if(text.length > 0) {
			$('.concord-wrapper').filter(function (index) { 
				if ($(this).html().toLowerCase().indexOf(text.toLowerCase()) >= 0) {

					FargoOutlineSearch.searchTag($(this));
				}
			});
			$('.search-tag').closest('.tab-pane').each(FargoOutlineSearch.highlightTab);
		}
	},
	searchListEntry: function(text, tab, id) {
		// fix text length
		if(text.length > 75) {
			text = text.substr(0, 72) + '...';
		}

		var li = '<li class="search-result-item" data-foslocid="'+id+'">';
		li += '<span class="search-result-item-title">' + tab + '</span>';
		li += '<span class="search-result-item-body">' + text + '</span>';
		li += '</li>';
		return li;
	},
	buildCss: function() {
		var cssSelectors = Object.keys(FargoOutlineSearch.css), cssStr = '';	
		for(var i = 0, l = cssSelectors.length; i < l; ++i) {
			cssStr += cssSelectors[i] + '{' + FargoOutlineSearch.css[cssSelectors[i]].join(";\r\n") + '}';
		}

		$('head').append('<style>' + cssStr + '</style>');
	},
	jumpToSearchResult: function(tab) {
		$('span[id^=idTabsTitle]').each(function(i, v) { 
			if($(v).text() == tab){ 
				$(v).closest('a').click(); 
			}
		});
	},
	init: function() {
		FargoOutlineSearch.buildCss();

		// add the search input to the screen
		$('#idTabs').prepend(FargoOutlineSearch.html.searchBox);

		// bind the keyboard event to access search
		$('body').on('keydown', function(e) {
			if(e.which === 191 && e.ctrlKey) {
				$('#search-terms').focus();
			}
		});

		$('body').on('click', function(e) {
			// ignore clicking on the input box
			if(e.target != $('#search-terms').get(0)) {
				$('#search-results li').hide();
			}
		});

		$('body').on('focus', '#search-box', function(e) {
			$('#search-results li').show();
		});

		// bind the keyboard events for the search box
		$('#idTabs').on('keydown', '#search-box', function(e) {
			switch(e.which) {
				case 13:
					FargoOutlineSearch.search($('#search-terms').val());
					break;
				case 27:
					$('#search-terms').blur().val('');
					FargoOutlineSearch.clearSearchTags();
					break;
			}
		});

		// bind the click event for the search-result-item
		$('body').on('click', '.search-result-item', function(e) {
			e.preventDefault();
			e.stopPropagation();

			FargoOutlineSearch.jumpToSearchResult($(this).find('.search-result-item-title').text());
		});

	}
};

FargoOutlineSearch.init();
