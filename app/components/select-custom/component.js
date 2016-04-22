import Ember from 'ember';

export default Ember.Component.extend({
  filtered: '',
  actions: {
    select: function (item) {
      console.log('select (select-custom) =>', item);
      this.set('filtered', item.text);
      this.sendAction('select', item.id);
      this.set('selected', null);
    }
  }
});
