import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	// init(){
	// 	this._super(...arguments);
	// 	this.get('store').findAll('friend-invitation').then(res=>{
	// 		this.set('invites', res);
	// 	})
	// },
	// invitesRemaining: Ember.computed('invites', function(){
	// 	return 10 - this.get('invites.length');
	// })
});
