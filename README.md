# Ember-cli-jquery-datatables

This is a pre-alpha release to use jquery-datatables in an ember app.  Currently just a shim to load jquery datatables, extensions, and css

This addon has been massively updated, but within my app, and I am in the process of extracting the work into this addon.
The intent is to leverage the robust functionality of jquery-datatables, while still maintaining interactivity and integrity with the surrounding ember app.

Developed for ember 1.12.3, not tested on 1.13+

Note that if you are manipulating the table (adding/updating/deleting rows) while it is visible, some hackery has to be performed to ensure that ember's dom manipulation and jquery-datatables remain in sync.  


## Installation

* `ember install ember-cli-jquery-datatables`


## Configuration

Add the assets you want to import to your Brocfile.  

Use the `extensions` configuration option to specify which extensions to load. By default, the extensions will load their associated css based on the global `style` configuration option, but this behavior can be overriden by passing an object instead of a string into the extensions array.  

The `buttons` extension also supports additional configuration options for loading buttons.  This extension also requires additional libraries for some button types.  These libraries can be included via the addon, or manually included in your app.  See the datatables documentation for which libraries are required on the various button types.

The following example will exclude css for the 'autofill' extension, will specify 'dt' css for the responsive extension, and will load additional button types.  It will also load the jszip library.

```
/* Brocfile.js */
var app = new EmberApp({
	datatables: {
		core: true,
		style: 'bs', // false, 'dt', 'bs', 'jqui', or 'zf' for styling (none, datatables, bootstrap, jqueryui, or foundation css)
		extensions: [
			{ name: 'autofill', style: false },
			{ name: 'buttons', extensions: ['colVis','flash','html5','print'] },
			'colreorder',
			'fixedcolumns',
			'fixedheader',
			'keytable',
			{ name: 'responsive', style: 'dt' },
			'scroller',
			'select'
		],
		// these libraries are required for some button types
		pdfmake: false, 
		vfs_fonts: false, 
		jszip: true
	}
})
	
```

## Known Issues

- The image files for the base datatables css have to be manually imported in your app, as this extension does not include them.  This will be fixed in a future release.

Not all extensions have been tested with ember, so YMMV.  Use with care in production.  Works very well for static tables, but requires more effort for seamless interaction with dynamic tables (ie, table in view while other actions manipulate ember rendered data)

## Coming Soon

Ember components that allow rich interaction and styling of tables using ember conventions

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
