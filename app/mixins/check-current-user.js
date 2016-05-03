import Ember from 'ember';

export default Ember.Mixin.create({
	isCurrentUser: Ember.computed('', function(){
    let userid = this.get('session.data.authenticated.user_id');

  	return this.get('model.profile.id') == userid ? true : false;
  })
});