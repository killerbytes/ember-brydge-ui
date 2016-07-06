import Ember from 'ember';
export default Ember.Component.extend({
	tagName: 'label',
  classNames: ['checkbox'],
	classNameBindings: ['reversed'],
  attributeBindings: ['for'],
  for: Ember.computed('id', function(){
  	return this.get('id');
  }),
  didInsertElement(){
    this.set('for', this.$('input').id);
  },
  onChange: function(e) {
    this.set('checked', !this.get('checked'))
    this.sendAction('action', this.get('value'), this.get('checked'), this.get('text'), e);
  }
});
