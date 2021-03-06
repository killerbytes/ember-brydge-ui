import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  notification: Ember.inject.service(),
	requests: Ember.computed('model.@each.status', function(i) {
    var userid = this.get('session.data.authenticated.user_id');
    return this.get('model').filter(function(i){
    	return i.get('userid.id') != userid && i.get('status') == "pending";
    })
  })
});
