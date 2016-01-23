/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-jquery-datatables',
	blueprintsPath: function() {
		return path.join(__dirname, 'blueprints');
	},
	
	included: function(app) {
		this._super.included(app);
		
		
		
		var _dt = app.options.datatables || { 	
			// import core
			core: true,
			legacy: false,
			
			// import core css
			// datatables, bootstrap, jqueryui, or foundation
			// false, 'dt', 'bs', 'jqui', or 'zf'
			style: false, 
			
			// import extensions
			// 'autofill', 
			// 'buttons',
			// 'colreorder',
			// 'fixedcolumns', 
			// 'fixedheader', 
			// 'keytable',
			// 'responsive',
			// 'scroller',
			// 'select'
			extensions: [],
			
		};
		
		var styleMap = {
			dt: 'dataTables',
			bs: 'bootstrap',
			jqui: 'jqueryui',
			zf: 'foundation'
		};
		
		// packages with js in style
		var extHasJs = {
			buttons: true,
			responsive: true,
			autofill: true,
		};
		
		var corePath = 'datatables.net';
		var core = 'jquery.dataTables.js';
		var packages = [];
		
		if (_dt.legacy) { this.app.import(app.bowerDirectory + '/datatables/media/js/jquery.dataTables.js'); }
		
		if (_dt.core) {
			packages.push(path.join(corePath, 'js', core));
			
			if (_dt.style && styleMap.hasOwnProperty(_dt.style)) {
				if (_dt.style === 'dt') { 
					packages.push(path.join([corePath,_dt.style].join('-'), 'css', 'jquery.dataTables.css'));
				} else {
					// other packages 
					packages.push(path.join([corePath,_dt.style].join('-'), 'css', ['dataTables',styleMap[_dt.style],'css'].join('.')));
					packages.push(path.join([corePath,_dt.style].join('-'), 'js', ['dataTables',styleMap[_dt.style],'js'].join('.')));
				}
			}
			
			_dt.extensions.forEach(function(ext){
				packages.push(path.join([corePath, ext].join('-'), 'js', ['dataTables', ext, 'js'].join('.')));
				
				if (_dt.style && styleMap.hasOwnProperty(_dt.style)) {
					packages.push(path.join([corePath,ext,_dt.style].join('-'), 'css', [ext, styleMap[_dt.style],'css'].join('.')));
					
					// some extensions require js as well
					if (_dt.style !== 'dt' && extHasJs[ext] === true) { 
						packages.push(path.join([corePath,ext,_dt.style].join('-'), 'js', [ext, styleMap[_dt.style],'js'].join('.')));
					}
				}
			});
			
			console.log(packages);
			console.log(app.bowerDirectory);
			packages.forEach(function(pkg) {
				console.log(pkg);
				this.app.import(app.bowerDirectory + '/' + pkg);
			}, this);
			
		}
	}
};
