import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service('session'),
	isCurrentUser: Ember.computed('', function(){
    let userid = this.get('session.data.authenticated.user_id');
    console.log(this.get('model.profile.id'), userid)
  	return this.get('model.profile.id') == userid ? true : false;
  })
});
