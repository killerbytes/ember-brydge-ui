import Ember from 'ember';

export default Ember.Route.extend({
	store: Ember.inject.service(),
	ajaxApi: Ember.inject.service(),
	session: Ember.inject.service(),
	model: function(){
		let ownerid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', ownerid)
		});
	// 	return this.store.findAll('newsfeed', {reload: true});
	// },
	// setupController(controller, model){
	// 	this._super(...arguments);
	// 	controller.set('newsfeed', model);
	// 	// console.log(controller)
	// 	// controller.setProperties(model);
	},
	actions: {
		crawl(){
			var url = "v1/crawl?url=" + this.get('controller.text');
	    this.get('ajaxApi').request(url, {
				method: 'GET'
      }).then((res)=>{
      	console.log(res);
      	this.set('controller.site', res);
      });

		}
	}

});
