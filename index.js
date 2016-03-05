/* jshint node: true */
'use strict';
var path = require('path');
var extend = require('node.extend');

module.exports = {
  name: 'ember-cli-jquery-datatables',
	blueprintsPath: function() {
		return path.join(__dirname, 'blueprints');
	},
	
	included: function(app) {
		this._super.included(app);
		
		var DTConfig = {
			packages: [],
			_dtStyleMap: {
				dt: 'dataTables',
				bs: 'bootstrap',
				jqui: 'jqueryui',
				zf: 'foundation'
			},
			_dtExtensionHasJs: {
				buttons: true,
				responsive: true,
				autofill: true
			},
			_dtAvailableExtensions: {
				autofill: true,
				buttons: true,
				colreorder: true,
				fixedcolumns: true,
				fixedheader: true,
				keytable: true,
				responsive: true,
				scroller: true,
				select: true
			},
			_dtAvailableButtonExtensions: {
				colVis: true,
				flash: true,
				html5: true,
				print: true,
			},
			_dtCorePath: 'datatables.net',
			_dtCoreFile: 'jquery.dataTables.js',
			
			_parseStyle: function(style) {
				if (DTConfig._dtStyleMap.hasOwnProperty(style)) {
					return DTConfig._dtStyleMap[style];
				}
				return false;
			},
			
			_extensionHasJs: function(extension) {
				return DTConfig._dtExtensionHasJs[extension] || false;
			},
			_isButtonExtensionValid: function(buttonExtension) {
				return DTConfig._dtAvailableButtonExtensions[buttonExtension] || false;
			},
			_isExtensionValid: function(extension) {
				return DTConfig._dtAvailableExtensions[extension] || false;
			},
			
			_includeDTCoreStyle: function(styleType) {
				if (!styleType) { return; }
				var style = DTConfig._parseStyle(styleType);
				
				if (!style) { return; }
				
				var coreStyleFolder = [DTConfig._dtCorePath, styleType].join('-');
				var coreStyleFile = 'jquery.dataTables.css';
				var coreStylePkg = path.join(coreStyleFolder,'css',coreStyleFile);
				
				// dt style only has css, no js
				if (styleType === 'dt') {
					DTConfig.packages.push(coreStylePkg);
				} 
				else {
					coreStyleFolder = [DTConfig._dtCorePath, styleType].join('-');
					coreStyleFile = ['dataTables', style, 'css'].join('.');
					coreStylePkg = path.join(coreStyleFolder, 'css', coreStyleFile);
					
					var coreStyleJsFile = ['dataTables', style, 'js'].join('.');
					var coreStyleJsPkg = path.join(coreStyleFolder, 'js', coreStyleJsFile);
					
					DTConfig.packages.push(coreStylePkg);
					DTConfig.packages.push(coreStyleJsPkg);
				}
				
			},
			
			_includeDTExtension: function(extension, options) {
				// don't do anything if we don't recognize the extension
				if (!DTConfig._isExtensionValid(extension)) { return; }
				
				// get the js for this extension
				var extFolder = ['datatables.net',extension].join('-');
				var extFile = ['dataTables',extension,'js'].join('.');
				var extPkg = path.join(extFolder,'js',extFile);
				
				DTConfig.packages.push(extPkg);
				
				if (options && options.style) {
					var style = DTConfig._parseStyle(options.style);
					
					// process extension style css
					if (style) {
						var extStyleFolder = [extFolder, options.style].join('-');
						var extStyleFile = [extension, style, 'css'].join('.');
						var extStylePkg = path.join(extStyleFolder,'css',extStyleFile);
						
						DTConfig.packages.push(extStylePkg);
						
						// if we are not using dt styles, check if we need to include any associated js
						if (options.style !== 'dt') {
							if (DTConfig._extensionHasJs(extension)) {
								var extStyleJsFile = [extension, style, 'js'].join('.');
								var extStyleJsPkg = path.join(extStyleFolder, 'js', extStyleJsFile);
								
								DTConfig.packages.push(extStyleJsPkg);
								
							}
						}
					}
				}
				
				// if this is the buttons extension, include extra dependencies as required
				if (extension === 'buttons') {
					if (options && options.extensions) {
						options.extensions.forEach(function(buttonExtension) {
							if (DTConfig._isButtonExtensionValid(buttonExtension)) {
								var extButtonFile = ['buttons',buttonExtension,'js'].join('.');
								var extButtonPkg = path.join(extFolder, 'js', extButtonFile);
								
								DTConfig.packages.push(extButtonPkg);
							}
						});
					}
				}
			},
			
		};
		
		
		
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
			
			pdfmake: false,
			vfs_fonts: false,
			jszip: false
			
		};
		
		DTConfig.packages = [];
		
		if (_dt.legacy) { this.app.import(app.bowerDirectory + '/datatables/media/js/jquery.dataTables.js'); }
		
		if (_dt.core) {
			// include the core
			DTConfig.packages.push(path.join(DTConfig._dtCorePath, 'js', DTConfig._dtCoreFile));
			
			// include any associated styles if requested
			DTConfig._includeDTCoreStyle(_dt.style);
			
			// include any extensions
			_dt.extensions.forEach(function(ext){
				var extOptions = { style: _dt.style };
				
				if (typeof ext === 'string') {
					DTConfig._includeDTExtension(ext, extOptions);
				} 
				else if (typeof ext === 'object' && ext.name.length > 0) {
					DTConfig._includeDTExtension(ext.name, extend(true, {}, extOptions, ext));
				}
			});
			
			// include other dependencies (for buttons extension)
			if (_dt.jszip) {
				DTConfig.packages.push('jszip/dist/jszip.js');
			}
			if (_dt.pdfmake) {
				DTConfig.packages.push('pdfmake/build/pdfmake.js');
			}
			if (_dt.vfs_fonts) {
				DTConfig.packages.push('pdfmake/build/vfs_fonts.js');
			}

			// console.log(DTConfig.packages);
			
			DTConfig.packages.forEach(function(pkg) {
				this.app.import(app.bowerDirectory + '/' + pkg);
			}, this);
			
		}
	}
};
