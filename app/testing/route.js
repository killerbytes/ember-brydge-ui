import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	ajax: Ember.inject.service(),
	model(){
		var userid = '2zd33na16gv';
		// return this.store.queryRecord('conversation', {id: params.conversation_id});
		return this.infinityModel('conversation',{
			id: 'adc73f9c4a4511e6a648acbc32b17109',
			perPage: 3,
			startingPage: 1,
			modelPath: 'controller.model.messages'
		});
		// return this.get('ajax').request('v2/profiles/2zd33na16gv');
    // return Ember.RSVP.hash({
    //   categories: $.getJSON('data/categories.json'),
    //   favorites: this.store.findAll('favoriteindustry'),
    //   profile: this.store.findRecord('profile', '3ze5n8glm6b')
    // });
	}
});
