import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeScroller, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  utils: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  connection: Ember.inject.service(),
  notification: Ember.inject.service(),
  compliment: Ember.inject.service(),
  paramsUserProfile: null,
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
      }
  },
  beforeModel: function(transition) {
    const loggedinUser = this.get('session.data.authenticated');
    // if(!loggedinUser.user_id) this.transitionTo('public-profile', transition.params['profile'].username);
    return this.get('ajax').request(`v2/profiles/${transition.params['profile'].username}`,{
      method: 'OPTIONS'
    }).then(res=>{
      if (loggedinUser.user_id === res.userid) {
        this.transitionTo('me');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }

    })
  },
  model: function(params) {
    var ownerid = this.get('session.data.authenticated.user_id');
    var userid = this.get('userid');
    console.log(userid)
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      invites: this.store.findAll('friend-invitation'),
      username:  params.username,
      me: this.store.findRecord('profile', ownerid),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      posts: this.brydgeScroller('newsfeed', {
        per_page: 15,
        scroller: 'newsfeed',
				filter: userid,
				tab: 'profile',
				modelPath: 'controller.model.posts'
			}),
      //
      // compliments: this.store.query('compliment',{to: userid, userid: userid})
    });
  },
  afterModel(model){
    this.get('notification').profileView(model.profile)
    this.set('headTags', this.get('utils').setFBMetaTags(model.profile));
  },
  actions: {
    postCompliment(){
      var content = this.controller.get('complimentContent');
      var userid = this.get('currentModel.profile.id')
      var title = this.controller.get('complimentTitle');
      this.get('compliment').post(userid,title,content)
      .then((res)=>{
        this.controller.set('complimentContent', null);
      })
    }
  }
});
