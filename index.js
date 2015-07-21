/**
 * Module dependencies.
 */
var helpers = require("postcss-message-helpers");

/**
 * Constantes
 */
var HEX_ALPHA_RE = /hexa\(#([0-9a-fA-F]{3,6}),([\s]{1,})([0-9\.]{1,})\)/i;
var HEX_RE = /#([0-9a-fA-F]{3,6})/;
var OPACITY_RE = /[0-9\.]{1,}(?=\))/;
var DECIMAL_PRECISION = 100000; // 5 decimals

/**
 * PostCSS plugin to transform hexa alpha colors
 */
module.exports = function plugin() {
	return function(style) {
		style.eachDecl(function transformDecl(decl) {
			if (!decl.value || decl.value.indexOf("hexa") === -1) {
				return;
			}

			decl.value = helpers.try(function transformHexAlphaValue() {
				return transformHexAlpha(decl.value, decl.source);
			}, decl.source);
		});
	};
};


function transformHexAlpha(string) {
	var h = HEX_RE.exec(string);
	var o = OPACITY_RE.exec(string);
	if (!h) {
		return string;
	}
	
	var rgb = hexToRgb(h[0]);
	var rgb_chars = [rgb.r, rgb.g, rgb.b];
	
	if(o){
		rgb_chars.push(o);
		return 'rgba(' + rgb_chars.join(', ') +')';
	} else {
		return 'rgb(' + rgb_chars.join(', ') + ')';
	}
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}