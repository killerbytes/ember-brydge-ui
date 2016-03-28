import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'input',
	type:'text',
	attributeBindings: ['type', 'value'],
	content: null,
	
	_updateElementValue: function() {
    this.set('content', this.$().prop('value'));
    this.set('id', this.$().prop('id'));
  }.on('didInsertElement'),

  change: function() {
    this._updateElementValue();
    this.sendAction('action', this.get('content'), this.get('id'));
  }
});