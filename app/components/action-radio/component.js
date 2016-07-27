import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['type', 'value', 'htmlChecked:checked', 'name', 'disabled'],

  // value: null,
  // checked: null,
  // checked: Ember.computed('value', function() {
  // }).readOnly(),
  //
  checked: Ember.computed('value', function() {
    return this.get('value') === this.get('htmlChecked');
  }).readOnly(),

  // change: function() {
  //   console.log('change')
  //   this.set('checked', this.get('value'));
  //   this.sendAction('action', this.get('value'), this.get('checked'));
  // },
  //
  // _setCheckedProp: function() {
  //   console.log('setcheck')
  //   if (!this.$()) { return; }
  //   this.$().prop('checked', this.get('htmlChecked'));
  // },
  //
  // _updateElementValue: Ember.observer('htmlChecked', function() {
  //   console.log('htmlChecked')
  //   Ember.run.once(this, '_setCheckedProp');
  // })
  // _updateElementValue: function() {
  //   this.set('checked', this.$().prop('checked'));
  // }.on('didInsertElement'),

});
