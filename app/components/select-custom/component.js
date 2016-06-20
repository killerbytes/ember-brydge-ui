import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service('session-account'),
	classNames: ['wrapper'],
  actions: {
    select: function (item) {
      this.sendAction('select', item, ()=>{
        this.$('.filter-dropdowns').foundation('close');
      });
      this.set('selected', null);
    }
  }
});
