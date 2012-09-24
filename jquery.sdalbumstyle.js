/* sdAlbumStyle 1.0.0 */
(function($){
	$.sdAlbumStyle = function(settings) {
		// OPTIONS
		var opts = {
			plusClass : 'contentShadow'
		}
		
		// check for options
        if (settings) $.extend(opts, settings);
		
		// VARIABLES
		var jq = $([]),
        pAlbum = jq.add('div.album-wrapper'),
        tFrameImg = pAlbum.find('div.thumbnail-frame img'),
		mFrameImg = jq.add('.movie-thumbnail-frame img');
		
		// style photo thumbnails
    	tFrameImg.addClass(opts.plusClass);

        // show Photo Album elements
		if (pAlbum.length) {
			var aTitle = pAlbum.parent().find('div.album-title'),
	        	aDesc = pAlbum.parent().find('div.album-description');

	        if (!aTitle.html().length && !aDesc.html().length) pAlbum.css('margin-top', '3em').append('<div class="clear"/>');
	        else if (aTitle.html().length && !aDesc.html().length) aTitle.show().css('margin-bottom', '1em');
	        else if (!aTitle.html().length && aDesc.html().length) aDesc.show();
	        else if (aTitle.html().length && aDesc.html().length) aTitle.show(), aDesc.show();
		};

		// style movie thumbnails
        if (mFrameImg.length) mFrameImg.addClass(opts.plusClass);
	}
})(jQuery);