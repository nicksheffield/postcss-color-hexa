var hexa = require('../hexa');
var postcss = require('postcss');
var chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;


describe('postcss-color-hexa', function() {

	function transform (source) {
		var res;
		try {
			res = postcss([hexa]).process(source).css;
		} catch (err){
			// console.log(err);
			// throw err;
			res = err.reason;
		}
		return res;
	}

	it('short hex and full decimal', function(done) {
		expect(transform('body { background: hexa(#fff, 0.1); }'))
		.to.equal('body { background: rgba(255, 255, 255, 0.1); }');
		
		done();
	});
	
	it('full hex and full decimal', function(done) {
		expect(transform('body { background: hexa(#ffffff, 0.1); }'))
		.to.equal('body { background: rgba(255, 255, 255, 0.1); }');
		
		done();
	});

	it('short hex and integer', function(done) {
		expect(transform('body { background: hexa(#fff, 1); }'))
		.to.equal('body { background: rgba(255, 255, 255, 1); }');
		
		done();
	});
	
	it('full hex and integer', function(done) {
		expect(transform('body { background: hexa(#ffffff, 1); }'))
		.to.equal('body { background: rgba(255, 255, 255, 1); }');
		
		done();
	});
	
	it('short hex and zeroless decimal', function(done) {
		expect(transform('body { background: hexa(#fff, .1); }'))
		.to.equal('body { background: rgba(255, 255, 255, .1); }');
		
		done();
	});
	
	it('full hex and zeroless decimal', function(done) {
		expect(transform('body { background: hexa(#ffffff, .1); }'))
		.to.equal('body { background: rgba(255, 255, 255, .1); }');
		
		done();
	});
	
	it('hex with zeroes at the end and zeroless decimal', function(done) {
		expect(transform('body { background: hexa(#f00, .1); }'))
		.to.equal('body { background: rgba(255, 0, 0, .1); }');
		
		done();
	});

	it('hex with zeroes at the end and full decimal', function(done) {
		expect(transform('body { background: hexa(#f00, 0.1); }'))
		.to.equal('body { background: rgba(255, 0, 0, 0.1); }');
		
		done();
	});

	it('without hexa', function(done) {
		expect(transform('body { background: #f00; }'))
		.to.equal('body { background: #f00; }');
		
		done();
	});

	it('first within a multi-value property', function(done) {
		expect(transform('body { border: hexa(#fff, 0.1) 1px solid; }'))
		.to.equal('body { border: rgba(255, 255, 255, 0.1) 1px solid; }');
		
		done();
	});

	it('within a multi-value property', function(done) {
		expect(transform('body { border: 1px hexa(#fff, 0.1) solid; }'))
		.to.equal('body { border: 1px rgba(255, 255, 255, 0.1) solid; }');
		
		done();
	});

	it('last within a multi-value property', function(done) {
		expect(transform('body { border: 1px solid hexa(#fff, 0.1); }'))
		.to.equal('body { border: 1px solid rgba(255, 255, 255, 0.1); }');
		
		done();
	});

	it('multiple colors on a line including a hexa', function(done) {
		expect(transform('body { border-color: #fff hexa(#fff, 0.1) red #f00; }'))
		.to.equal('body { border-color: #fff rgba(255, 255, 255, 0.1) red #f00; }');
		
		done();
	});

	it('multiple hexa\'s on a line', function(done) {
		expect(transform('body { border-color: #0f0 hexa(#f0f, 0.1) hexa(#fff, 0.1) #f00; }'))
		.to.equal('body { border-color: #0f0 rgba(255, 0, 255, 0.1) rgba(255, 255, 255, 0.1) #f00; }');
		
		done();
	});

	it('invalid hex code fails', function(done) {
		expect(transform('body { background: hexa(#f0f0, 0.1); }'))
		.to.equal('Invalid hex color: #f0f0');
		
		done();
	});

	it('invalid opacity number fails', function(done) {
		expect(transform('body { background: hexa(#f0f, 0.1.1); }'))
		.to.equal('Invalid opacity: 0.1.1');
		
		done();
	});

});