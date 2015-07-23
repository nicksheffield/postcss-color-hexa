// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

var helpers = require("postcss-message-helpers");
var postcss = require("postcss");


// ----------------------------------------------------------------------------
// Regex's
// ----------------------------------------------------------------------------

// Match the whole property
var HEX_ALPHA_RE = /hexa\(#(?:[0-9a-f]{3}){1,2},([\s]{1,})([0-9\.]{1,})\)/i;

// Match the hex color
var HEX_RE = /#(?:[0-9a-f]{3}){1,2}/i;

// Match the opacity number
var OPACITY_RE = /[0-9\.]{1,}(?=\))/;


// ----------------------------------------------------------------------------
// PostCSS Plugin
// ----------------------------------------------------------------------------

module.exports = postcss.plugin('hexa', function(opts) {
	opts = opts || {};

	return function(css) {
		css.eachDecl(function transformDecl(decl) {
			if (!decl.value || decl.value.indexOf('hexa') === -1) {
				return;
			}

			decl.value = helpers.try(function transformHexAlphaValue() {
				return ;
			}, decl.source);
		});
	};
});


// ----------------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------------

function transformHexAlpha(string) {

	return recurse(string);

	function recurse(input) {
		var hexa_pos = input.indexOf('hexa');
		var h = HEX_RE.exec(input.substring(hexa_pos));
		var o = OPACITY_RE.exec(input.substring(hexa_pos));

		if (!h) {
			return input;
		}

		var rgb = hexToRgb(h[0]);
		var rgb_chars = [rgb.r, rgb.g, rgb.b];
		var hexa = '';

		if (o) {
			rgb_chars.push(o);
			hexa = 'rgba(' + rgb_chars.join(', ') + ')';
		} else {
			hexa = 'rgb(' + rgb_chars.join(', ') + ')';
		}

		var result = input.replace(HEX_ALPHA_RE, hexa);

		if (result.indexOf('hexa') === -1) {
			return result;
		} else {
			return recurse(result);
		}
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