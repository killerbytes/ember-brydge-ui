import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['type', 'value', 'checked', 'name', 'disabled'],
  checked: Ember.computed('htmlChecked','value', function() {
    return this.get('value') === this.get('htmlChecked');
  }).readOnly(),
  click(e){
    this.set('htmlChecked',e.currentTarget.value)
  }


});
