import Ember from 'ember';
export default Ember.Component.extend({
  attributeBindings: ['type', 'value', 'text'],

  onChange: function(e) {
    // console.log('onChange', this)
    this.set('checked', !this.get('checked'))
    this.sendAction('action', this.get('value'), this.get('checked'), this.get('text'));
  }
});
