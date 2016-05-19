import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service('session-account'),
	classNames: ['wrapper'],
  //filtered: 'hello',
  actions: {
    select: function (item) {
      console.log('select (select-custom) =>', item.text);
      //this.set('filtered', 'Hein');
      this.sendAction('select', item.id);
      this.set('selected', null);
    }
  }
});
