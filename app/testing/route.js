import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
	model: function(){
    var ownerid = this.get('session.data.authenticated').user_id;
		return this.store.query('language', {userid: ownerid});
	},
});
