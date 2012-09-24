/*
	# sdLightboxAlbums - prettyPhoto lightbox helper for RapidWeaver theme developers #

	AUTHOR:	Adam Merrifield <http://adam.merrifield.ca>
	VERSION: 1.1.0

	SETTINGS:
	- css_file: is the path to the prettyPhoto css file within the RapidWeaver theme
	- js_file: is the path to the prettyPhoto jQuery plugin
	
	OPTIONS:
	- animation_speed: can be normal, slow or fast
	- show_title: can be true or false
	- theme: can be default, dark_rounded, dark_square, light_rounded, light_square, facebook

	USAGE:
		// basic use
		$.sdLightboxAlbums({
			css_file	:	'some/path/prettyPhoto.css',
			js_file		:	'another/folder/jquery.prettyPhoto.js'
		});
		
		// advanced use with options
		$.sdLightboxAlbums({
			css_file	:	'some/path/prettyPhoto.css',
			js_file		:	'another/folder/jquery.prettyPhoto.js',
			animation_speed	:	'slow',
			show_title		:	true,
			theme			:	'facebook',
			social_tools	:	false
		});
*/
(function($) {
    $.sdLightboxAlbums = function(settings) {
        // SETTINGS
        var opts = {
            css_file: '',
            css_local: '',
            js_file: '',
            js_local: '',
			animation_speed: 'normal',
            show_title: false,
            theme: 'default',
            social_tools: false
        };
		// check for options
		if ((settings.css_file && settings.js_file) || (settings.css_local && settings.js_local)) {
			$.extend(opts, settings);
			// VARIABLES
			var jq = $([]),
			phA = jq.add('.album-wrapper'),
			mA = jq.add('.movie-thumbnail-frame'),
			thFrame = phA.find('.thumbnail-frame');

			// ACTION
			var doPrettyPhoto = function(path){
				if (phA.length || mA.length) {
					// load css (prettyPhoto)
					$("head").append("<link>").children(":last").attr({
						rel: "stylesheet",
						type: "text/css",
						href: path
					});
					// Photo Album
					if (phA.length) {
						// get thumbnail links and alter attributes (prettyPhoto)
						thFrame.each(function() {
							var thisAnch = jq.add('a', this),
							thisImg = jq.add('a img', this),
							thisCap = jq.add('.thumbnail-caption', this);
							thisAnch.attr({
								'href': thisImg.attr('src').replace(/thumb/i, 'full'),
								'rel': 'prettyPhoto[gallery]',
								'title': thisCap.text()
							});
						});
					} else {
						// since photo album is false movie album is true
						// get thumbnails links and alter attributes (prettyPhoto)
						mA.each(function() {
							var thisAnch = jq.add('a', this);
							var thisCap = jq.add('.movie-thumbnail-caption', this);
							var thisPage = thisAnch.attr('href');
							thisAnch.removeAttr('onclick').removeAttr('onkeypress').attr({
								'href': thisPage + '?iframe=true&width=75%&height=75%',
								'rel': 'prettyPhoto[iframes]',
								'title': thisCap.text()
							});
						});
					}
					// apply effects (prettyPhoto)
					jq.add('a[rel^=prettyPhoto]').prettyPhoto({
						animation_speed: opts.animation_speed,
						show_title: opts.show_title,
						theme: opts.theme,
						social_tools: opts.social_tools
					});
				}
			};
			// load js (prettyPhoto)
			// remote attempt
			$.getScript(opts.js_file, function() {
				if (prettyPhoto != 'undefined') doPrettyPhoto(opts.css_file);
			});
			// local attempt
			$.getScript(opts.js_local, function() {
				if (prettyPhoto != 'undefined') doPrettyPhoto(opts.css_local);
			});
		} else {
			// if no options detected, issue warning
			var msg = 'The paths to the lightbox files have not been set by the theme developer!';
			alert(msg);
			console.log(msg);
		}
    }
})(jQuery);