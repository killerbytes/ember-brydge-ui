import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    if(!userid) this.transitionTo('public-profile', transition.params[transition.targetName].username);
    return this.get('ajax').request('v2/profiles/'+transition.params[transition.targetName].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.background');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }
    })
  },

  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
      }
  },
  model(params) {
    let userid = this.get('userid');
    return Ember.RSVP.hash({
      username: params.username,
      profile: this.store.findRecord('profile', userid),
      // posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      languages: this.store.query('language', {userid: userid}),
      experiences: this.store.query('experience', {userid: userid}),
      educations: this.store.query('education', {userid: userid}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, userid: userid})
    });
  }
});
