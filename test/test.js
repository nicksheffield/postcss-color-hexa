var hexa = require('../hexa');
var postcss = require('postcss');


describe('hexa', function(){
	
	it('short hex and full decimal', function(done){
		
		postcss([hexa])
	
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
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
		
		postcss([hexa])
		
		.process('body { background: hexa(#f00, 0.1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: rgba(255, 0, 0, 0.1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	
	
	it('without hexa', function(done){
		
		postcss([hexa])
		
		.process('body { background: #f00; }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { background: #f00; }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('first within a multi-value property', function(done){
		
		postcss([hexa])
		
		.process('body { border: hexa(#fff, 0.1) 1px solid; }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { border: rgba(255, 255, 255, 0.1) 1px solid; }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('within a multi-value property', function(done){
		
		postcss([hexa])
		
		.process('body { border: 1px hexa(#fff, 0.1) solid; }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { border: 1px rgba(255, 255, 255, 0.1) solid; }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('last within a multi-value property', function(done){
		
		postcss([hexa])
		
		.process('body { border: 1px solid hexa(#fff, 0.1); }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { border: 1px solid rgba(255, 255, 255, 0.1); }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('multiple colors on a line including a hexa', function(done){
		
		postcss([hexa])
		
		.process('body { border-color: #fff hexa(#fff, 0.1) red #f00; }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { border-color: #fff rgba(255, 255, 255, 0.1) red #f00; }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
	it('multiple hexa\'s on a line', function(done){
		
		postcss([hexa])
		
		.process('body { border-color: #0f0 hexa(#f0f, 0.1) hexa(#fff, 0.1) #f00; }')
		
		.then(function (compiled) {
			if(compiled.css === 'body { border-color: #0f0 rgba(255, 0, 255, 0.1) rgba(255, 255, 255, 0.1) #f00; }'){
				done();
			}else{
				throw 'Output was incorrect';
			}
		});
		
	});
	
});