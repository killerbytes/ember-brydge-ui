import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	sessionAccount: Ember.inject.service(),
  ask: Ember.inject.service(),
	model: function() {
    let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromQuestions: this.store.query('ask',{from: userid}),
      toQuestions: this.store.query('ask',{to: userid}),

    })
	},
  actions: {
  	selectItem(item) {
  		this.set('ask.selectedQuestion', item);
  	},
    delete(item){
      this.get('ask').delete(item.id);
    },
    toggleHide(item){
      this.get('ask').hide(item.id);
    },

  }


});
