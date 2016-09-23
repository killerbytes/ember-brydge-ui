import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    if(!userid) this.transitionTo('public-profile', transition.params[transition.targetName].username);
    return this.get('ajax').request('v2/profiles/'+transition.params[transition.targetName].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.connections');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }
    })
  },
  model: function(params) {
    let userid = this.get('userid');
    // this.store.unloadAll('connection');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      accepted: this.store.query('connection',{userid: userid, status: 'accepted'}),
      // mutual: this.store.query('connection',{userid: userid, mutual: true})
    });
  }


});
