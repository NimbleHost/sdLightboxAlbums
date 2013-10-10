/**
 * sdLightboxAlbums - prettyPhoto lightbox helper for RapidWeaver theme developers
 *
 * AUTHOR:  Adam Merrifield <http://adam.merrifield.ca>
 * VERSION: 1.2.3
 *
 * SETTINGS:
 *  - css_file: is the path to the prettyPhoto css file within the RapidWeaver theme
 *  - js_file: is the path to the prettyPhoto jQuery plugin
 *
 *  OPTIONS:
 *  - animation_speed: can be normal, slow or fast
 *  - show_title: can be true or false
 *  - theme: can be default, dark_rounded, dark_square, light_rounded, light_square, facebook
 *
 *  USAGE:
 *      basic use
 *          $.sdLightboxAlbums({
 *              css_file   :   "value", 'some/path/prettyPhoto.css',
 *              js_file    :   'another/folder/jquery.prettyPhoto.js'
 *          });
 *
 *      advanced use with options
 *          $.sdLightboxAlbums({
 *              css_file    :   'some/path/prettyPhoto.css',
 *              css_local   :   RwGet.pathto('css/prettyPhoto.css'),
 *              js_file     :   'another/folder/jquery.prettyPhoto.js'
 *              js_local    :   RwGet.pathto('scripts/jquery.prettyPhoto.js'),
 *              animation_speed :   'slow',
 *              show_title      :   true,
 *              theme           :   'facebook',
 *              social_tools    :   false
 *          });
*/
(function($) {
    "use strict";
    jQuery.sdLightboxAlbums = function(settings) {
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
        // VARIABLES
        var phA = jQuery('.album-wrapper')
        , mA = jQuery('.movie-thumbnail-frame')
        , this_css, this_js;

        if (settings.css_local) {
            this_css = settings.css_local;
        } else {
            this_css = settings.css_file;
        }
        if (settings.js_local) {
            this_js = settings.js_local;
        } else {
            this_js = settings.js_file;
        }

        var throwError = function () {
            // if no options detected, issue warning
            var msg = 'The paths to the lightbox files have not been set by the theme developer!';
            alert(msg);
            console.log(msg);
        };

        // check for albums
        if (phA.length || mA.length) {
            // check for options
            if ((settings.css_file && settings.js_file) || (settings.css_local && settings.js_local)) {
                jQuery.extend(opts, settings);

                // ACTION
                var doPrettyPhoto = function(path){
                    // VARIABLES
                    var jq = jQuery([]),
                    thFrame = phA.find('.thumbnail-frame');

                    // load css (prettyPhoto)
                    jQuery("head").append("<link>").children(":last").attr({
                        rel: "stylesheet",
                        type: "text/css",
                        href: path
                    });
                    // Photo Album
                    if (phA.length) {
                        // get thumbnail links and alter attributes (prettyPhoto)
                        thFrame.each(function() {
                            var thisAnch = jQuery('a', this),
                            thisImg = jQuery('a img', this),
                            thisCap = jQuery('.thumbnail-caption', this);
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
                            var thisAnch = jQuery('a', this);
                            var thisCap = jQuery('.movie-thumbnail-caption', this);
                            var thisPage = thisAnch.attr('href');
                            thisAnch.removeAttr('onclick').removeAttr('onkeypress').attr({
                                'href': thisPage + '?iframe=true&width=75%&height=75%',
                                'rel': 'prettyPhoto[iframes]',
                                'title': thisCap.text()
                            });
                        });
                    }
                    // apply effects (prettyPhoto)
                    jQuery('a[rel^=prettyPhoto]').prettyPhoto({
                        animation_speed: opts.animation_speed,
                        show_title: opts.show_title,
                        theme: opts.theme,
                        social_tools: opts.social_tools
                    });
                };
                // load js (prettyPhoto)
                // remote attempt
                jQuery.ajax({
                    url: this_js,
                    dataType: "script",
                    async: false,
                    crossDomain: true,
                    success: function(){
                        doPrettyPhoto(this_css);
                    },
                    fail: function () {
                        throwError()
                    }
                });
                // local attempt
                if ((typeof jQuery.fn.prettyPhoto != 'function') && (opts.css_local && opts.js_local)) {
                    jQuery.ajax({
                        url: opts.js_local,
                        dataType: "script",
                        async: false,
                        crossDomain: false,
                        success: function(){
                            doPrettyPhoto(opts.css_local);
                        }
                    });
                }
            } else {
                throwError();
            }
        }
    };
})(jQuery);