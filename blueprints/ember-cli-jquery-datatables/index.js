'use strict';

/*
	This blueprint is run automatically via ember install:addon ember-cli-jquery-datatables
	Runs afterInstall hook to addBowerPackage dependency to our project for datatables and extensions, as well as all css
	
	The environment.js of the consuming app can then determine which modules to load
	
	Reference: http://johnotander.com/ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli/
*/
module.exports = {
	normalizeEntityName: function() {
		//tbh, not sure why I need this, but it's here
	},

	afterInstall: function(options) {
		// add Bower Packages
		
		
		console.log('Retrieving bower packages for jquery-datatables...');
		
		// packages
		var legacy = 'datatables'; //for compatibility with existing usage, temporary
		var core = 'datatables.net';
		var jszip = 'jszip';
		var pdfmake = 'pdfmake';
		
		var styles = [
			'dt',  //datatables
			'bs',  //bootstrap
			'zf',  //foundation
			'jqui' //jqueryui
		];
		
		var extensions = [
			'autofill',
			'buttons', 
			'colreorder',
			'fixedcolumns',
			'fixedheader',
			'keytable',
			'responsive',
			'scroller',
			'select'
		];
		
		var packages = [];
		
		// datatables core
		packages.push(legacy);
		packages.push(core);
		
		// dependencies (for buttons)
		packages.push(pdfmake);
		packages.push(jszip);
		
		// core styles
		styles.forEach(function(style) {
			packages.push([core, style].join('-'));
		});
		
		// extensions
		extensions.forEach(function(ext) {
			packages.push([core, ext].join('-'));
			
			// extension styles
			styles.forEach(function(style){
				packages.push([core, ext, style].join('-'));
			});
		});
		
		return this.addBowerPackagesToProject(
			packages.map(function(pkg){
				return { name: pkg };
			}))
			.then(function() {
				
				console.log(packages.length + ' datatables packages successfully imported');
			});
		
	}
};
