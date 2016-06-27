import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['reveal'],
  attributeBindings: ['data-reveal'],
  'data-reveal': ' ',
  didInsertElement(){
  	this.$().foundation();
  }
});
