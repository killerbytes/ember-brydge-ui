import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropdown-pane'],
  attributeBindings: ['data-dropdown', 'data-auto-focus', 'data-close-on-click'],
  'data-dropdown': ' ',
  'data-auto-focus': true,
  'data-close-on-click': true,
  didInsertElement(){
  	this.$().foundation();
  }
});
