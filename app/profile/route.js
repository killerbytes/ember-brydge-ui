import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeScroller, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  connection: Ember.inject.service(),
  notification: Ember.inject.service(),
  compliment: Ember.inject.service(),
  // loggedinUser: null,
  paramsUserProfile: null,
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
      }
  },

  beforeModel: function(transition) {
    this.get('ajax').request('/profile/'+transition.params['profile'].username,{
      method: 'OPTION'
    }).then(res=>{
      console.log(res);
    })
    const loggedinUser = this.get('session.data.authenticated');
    if(!loggedinUser.user_id) this.transitionTo('public-profile', transition.params['profile'].username);
    if (loggedinUser.user_id === transition.params['profile'].username) {
      this.transitionTo('me');
      return;
    }
  },
  model: function(params) {
    var ownerid = this.get('session.data.authenticated.user_id');

    var userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
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

      compliments: this.store.query('compliment',{to: userid, userid: userid})
    });
  },
  afterModel(model){
    this.get('notification').profileView(model.profile)
  },
  actions: {
    error() {
      this.transitionTo('home');
    },
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
