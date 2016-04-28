import Ember from 'ember';
export default Ember.Component.extend({
	tagName: 'label',
	classNameBindings: ['reversed'],
  attributeBindings: ['for'],
  for: Ember.computed('id', function(){
  	return this.get('id');
  }),
  didInsertElement(){
    this.set('for', this.$('input').id);
  },
  onChange: function(e) {
    // console.log('onChange', this)
    this.set('checked', !this.get('checked'))
    this.sendAction('action', this.get('value'), this.get('checked'), this.get('text'));
  }
});
