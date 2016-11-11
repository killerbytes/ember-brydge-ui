import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  BrydgeScroller,
  AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    if(!userid) this.replaceWith('index');
    return this.get('ajax').request('v2/profiles/'+transition.params[transition.targetName].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.following');
        return;
      }
      else{
        this.set('userid', res.userid)
        return;
      }
    })
  },
  model: function(params) {
    let userid = this.get('userid');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      followers: this.brydgeScroller('follower',{
				userid: userid,
				modelPath: 'controller.model.followers',
				scroller: 'follow'
			}),
    });
  }
});
