import Ember from 'ember';

export default Ember.Route.extend({
  // model(){
  //   return this.store.findRecord('profile', '2zd33na16gv')
  // },
  actions: {
    save(){
      this.set('controller.model.dob', moment({year: 1979, month: 1, date: 15}).format());
      this.get('controller.model').save();

    }
  }
});
