import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
	filteredContent: Ember.computed('model.@each.status', function(i) {
    // return this.get('model').filterBy('status', 'pending')
    var ownerid = this.get('sessionAccount.account.id');
    return this.get('model').filter(function(i){
    	return i.get('from.id') != ownerid && i.get('status') == 'pending';
    })
  })
});
