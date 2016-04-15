import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	model: function(){
		var userid = this.get('session.data.authenticated.user_id');
		return this.store.query('connection',{to: userid});
	}
});
