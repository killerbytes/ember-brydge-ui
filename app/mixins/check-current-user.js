import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service('session'),
	isCurrentUser: Ember.computed('me', function(){
    let userid = this.get('session.data.authenticated.user_id');
  	return this.get('me.id') == userid ? true : false;
  })
});
