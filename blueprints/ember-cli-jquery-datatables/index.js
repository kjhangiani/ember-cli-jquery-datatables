'use strict';

/*
	This blueprint is run automatically via ember install:addon ember-cli-highcharts
	Runs afterInstall hook to addBowerPackage dependency to our project for highcharts-release
	
	Reference: http://johnotander.com/ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli/
*/
module.exports = {
	normalizeEntityName: function() {
		//tbh, not sure why I need this, but it's here
	},

	afterInstall: function(options) {
		//add Bower Package for highcharts-release
		//@todo: highstock, highmaps?
		return this.addBowerPackageToProject('datatables');
	}
};
