import Ember from 'ember';

export default Ember.Route.extend({
	sessionAccount: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
	model: function() {
		let ownerid = this.get('sessionAccount.account.id');
		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', ownerid),
      fromQuestions: this.store.query('ask',{from: ownerid}),
      toQuestions: this.store.query('ask',{to: ownerid}),

    })
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.setProperties(model);
    controller.set('settingsChanged', function(value) {
      this.send('settingsChanged', value);
    });    
	}

});
