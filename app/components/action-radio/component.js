import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['type', 'htmlChecked:checked', 'value', 'name', 'disabled'],

  value: null,
  checked: null,

  htmlChecked: Ember.computed('value', 'checked', function() {
    return this.get('value') === this.get('checked');
  }),

  change: function() {
    console.log('change..', this.get('value'))
    this.set('checked', this.get('value'));
    this.sendAction('action', this.get('value'), this.get('checked'));
  },

  _setCheckedProp: function() {
    if (!this.$()) { return; }
    this.$().prop('checked', this.get('htmlChecked'));
  },

  _updateElementValue: Ember.observer('htmlChecked', function() {
    Ember.run.once(this, '_setCheckedProp');
  })
});