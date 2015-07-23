// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

var helpers = require("postcss-message-helpers");
var postcss = require("postcss");


// ----------------------------------------------------------------------------
// Regex's
// ----------------------------------------------------------------------------

// Match the whole property
var HEX_ALPHA_RE = /hexa\(#(?:[0-9a-f]{3}){1,2},([\s]{0,})[0-9]*(\.)?[0-9]+\)/i;

// Match the hex color
var HEX_RE = /#(?:[0-9a-f]{3}){1,2}/i;

// Match the opacity number
var OPACITY_RE = /[0-9]*(\.)?[0-9]+(?=[\s]*\))/;

// Match an invalid hex code (followed by, but not including, a comma)
var INV_HEX_RE = /#(((?:[0-9a-f]){0,2})|((?:[0-9a-f]){4,5})|(((?:[0-9a-f]){7,})))(?=,)/i;

// Match an invalid opacity number
var INV_OPACITY_RE = /[0-9]*(\.)?[0-9]*(?:\.[0-9]*){2,}/i;

// ----------------------------------------------------------------------------
// PostCSS Plugin
// ----------------------------------------------------------------------------

module.exports = postcss.plugin('postcss-color-hexa', function(opts) {
	opts = opts || {};

	return function(css) {
		css.eachDecl(function transformDecl(decl) {
			if (!decl.value || decl.value.indexOf('hexa') === -1) {
				return;
			}

			decl.value = helpers.try(function transformHexAlphaValue() {
				return transformHexAlpha(decl.value, decl.source, decl);
			}, decl.source);
		});
	};
});


// ----------------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------------

function transformHexAlpha(string, source, decl) {

	return recurse(string);

	function recurse(input) {
		var hexa_pos = input.indexOf('hexa');
		var subs = input.substring(hexa_pos);
		
		var h = HEX_RE.exec(subs);
		var o = OPACITY_RE.exec(subs);
		
		var i_h = INV_HEX_RE.exec(subs);
		var i_o = INV_OPACITY_RE.exec(subs);
		
		if(i_h !== null){
			throw decl.error('Invalid hex color: ' + i_h[0], { plugin: 'postcss-color-hexa' });
		}
		
		if(i_o !== null){
			throw decl.error('Invalid opacity: ' + i_o[0], { plugin: 'postcss-color-hexa' });
		}

		if (!h) {
			return input;
		}

		var rgb = hexToRgb(h[0]);
		var rgb_chars = [rgb.r, rgb.g, rgb.b];
		var hexa = '';

		if (o) {
			rgb_chars.push(o[0]);
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