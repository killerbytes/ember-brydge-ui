import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  isCurrentUser: Ember.computed('', function(){
    let userid = this.get('session.data.authenticated.user_id');

  	return this.get('model.profile.id') == userid ? true : false;
  })
});
