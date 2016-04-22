import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  notification: Ember.inject.service(),
	requests: Ember.computed('model.@each.status', function(i) {
    var ownerid = this.get('sessionAccount.account.id');
    return this.get('model').filter(function(i){
    	return i.get('from.id') != ownerid && i.get('status') == 'pending';
    })
  })
});
