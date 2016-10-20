import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    return this.get('ajax').request('v2/profiles/'+transition.params[transition.targetName].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.following');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }
    })
  },
  model: function(params) {
    let userid = this.get('userid');
    return Ember.RSVP.resolve({
      profile: this.store.findRecord('profile', userid),
      following: this.store.query('following', {userid: userid})
    });
  },
  actions: {
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('#ask-tabs').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.isMutual', true);
        })
      })
    },
    follower(){
      this.store.query('following', {userid: this.get('userid')}).then(res=>{
				this.set('controller.following', res);
			})
    },
    following(){
      this.store.query('follower', {userid: this.get('userid')}).then(res=>{
				this.set('controller.follower', res);
			})
    }
  }


});
