var hexa = require('../hexa');
var postcss = require('postcss');


describe('hexa()', function(){
	
	it('short hex and full decimal', function(done){
		
		postcss([hexa()])
	
		.process('body { background: hexa(#fff, 0.1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, 0.1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
	
	});
	
	it('full hex and full decimal', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#ffffff, 0.1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, 0.1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('short hex and integer', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#fff, 1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, 1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('full hex and integer', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#ffffff, 1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, 1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	
	
	it('short hex and zeroless decimal', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#fff, .1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, .1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('full hex and zeroless decimal', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#ffffff, .1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 255, 255, .1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('hex with zeroes at the end and zeroless decimal', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#f00, .1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 0, 0, .1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('hex with zeroes at the end and full decimal', function(done){
		
		postcss([hexa()])
		
		.process('body { background: hexa(#f00, 0.1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 0, 0, 0.1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
});