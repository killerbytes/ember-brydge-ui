import Ember from 'ember';


export default Ember.Mixin.create({
	invites: Ember.computed.alias('model.invites'),
	invitesRemaining: Ember.computed('invites', function(){
		return 10 - this.get('invites.length');
	})
});
