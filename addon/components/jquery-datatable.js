import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['table','table-striped','table-bordered','dataTable'],
  options: {},
  
  initDataTable: function() {

    this.$().dataTable(this.get('options'));
		
  }.on('didInsertElement')
});
