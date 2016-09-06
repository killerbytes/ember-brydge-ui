import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  ajax: Ember.inject.service(),
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
        controller.set('isClosed', null);
      }
  },
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    if(!userid) this.transitionTo('public-profile', transition.params['compliments'].username);
    return this.get('ajax').request('v2/profiles/'+transition.params['compliments'].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.compliments');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }
    })
  },
  model: function(params) {
    let userid = this.get('userid');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      toCompliments: this.store.query('compliment',{to: userid, status: 'accepted'}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, status: 'accepted', per_page: 1, page: 1})
    })
  }
});
