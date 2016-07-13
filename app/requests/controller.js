import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  notification: Ember.inject.service(),
	requests: Ember.computed('model.@each.status', function(i) {
    var ownerid = this.get('session.data.authenticated.user_id');
    return this.get('model').filter(function(i){
    	console.log(i.get('userid'), ownerid)
    	return i.get('userid') != ownerid && i.get('status') == 'pending';
    })
  })
});
