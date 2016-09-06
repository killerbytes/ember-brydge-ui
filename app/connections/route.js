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
  // beforeModel(transition) {
  //   this._super(...arguments);
	// 	const userid = this.get('session.data.authenticated.user_id');
	// 	if (userid === transition.params[transition.targetName].username) {
  //     this.transitionTo('me.connections');
  //   }
  // },
  model: function(params) {
    let userid = this.get('userid');
    this.store.unloadAll('connection');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      list: this.store.query('connection',{userid: userid}),
      mutual: this.store.query('connection',{userid: userid, mutual: true})
    });
  }


});
