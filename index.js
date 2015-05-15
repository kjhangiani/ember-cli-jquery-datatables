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
		
		this.app.import(app.bowerDirectory + '/datatables/media/js/jquery.dataTables.js');
		//this.app.import(app.bowerDirectory + '/datatables/media/css/jquery.dataTables.css');
		
		//include shim
		/*this.app.import('vendor/ember-jquery-datatables/shim.js', {
			type: 'vendor',
			exports: { 'DataTable': ['default'] }
		});*/
	}
};
