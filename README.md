# Ember-cli-jquery-datatables

This is a pre-alpha release to use jquery-datatables in an ember app.  Currently just a shim to load jquery datatables, extensions, and css

This addon has been massively updated, but within my app, and I am in the process of extracting the work into this addon.
The intent is to leverage the robust functionality of jquery-datatables, while still maintaining interactivity and integrity with the surrounding ember app.

Developed for ember 1.12.3, not tested on 1.13+

Note that if you are manipulating the table (adding/updating/deleting rows) while it is visible, some hackery has to be performed to ensure that ember's dom manipulation and jquery-datatables remain in sync.  


## Installation

* `ember install ember-cli-jquery-datatables`


## Configuration

Add the assets you want to import to your Brocfile

```
/* Brocfile.js */
var app = new EmberApp({
	datatables: {
		core: true,
		css: 'bs', // false, 'dt', 'bs', 'jqui', or 'zf' for styling (none, datatables, bootstrap, jqueryui, or foundation css)
		extensions: [
			'autofill',
			'buttons', 
			'colreorder',
			'fixedcolumns',
			'fixedheader',
			'keytable',
			'responsive',
			'scroller',
			'select'
		]
	}
})
	
```

Not all extensions have been tested with ember, so YMMV.  Use with care in production.  Works very well for static tables, but requires more effort for seamless interaction with dynamic tables (ie, table in view while other actions manipulate ember rendered data)

## Coming Soon

Ember components that allow rich interaction and styling of tables using ember conventions

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
